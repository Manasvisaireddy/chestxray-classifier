import torch
import torch.nn.functional as F
import numpy as np
import cv2
import base64
from PIL import Image
import io

class GradCAM:
    def __init__(self, model):
        self.model = model.model
        self.device = model.device
        self.transform = model.transform
        self.gradients = None
        self.activations = None

        # Hook into the last dense block
        target_layer = self.model.features.denseblock4
        target_layer.register_forward_hook(self._save_activation)
        target_layer.register_full_backward_hook(self._save_gradient)

    def _save_activation(self, module, input, output):
        self.activations = output.detach()

    def _save_gradient(self, module, grad_input, grad_output):
        self.gradients = grad_output[0].detach()

    def generate(self, pil_image, class_idx):
        tensor = self.transform(pil_image).unsqueeze(0).to(self.device)
        self.model.zero_grad()
        output = self.model(tensor)
        score = output[0][class_idx]
        score.backward()

        weights = self.gradients.mean(dim=[2, 3], keepdim=True)
        cam = (weights * self.activations).sum(dim=1, keepdim=True)
        cam = F.relu(cam)
        cam = F.interpolate(cam, size=(224, 224), mode="bilinear", align_corners=False)
        cam = cam.squeeze().cpu().numpy()
        cam = (cam - cam.min()) / (cam.max() - cam.min() + 1e-8)
        return cam


def generate_heatmap(model, pil_image, class_idx=6):
    gradcam = GradCAM(model)
    cam = gradcam.generate(pil_image, class_idx)

    # Overlay heatmap on original image
    img_array = np.array(pil_image.resize((224, 224)))
    heatmap = cv2.applyColorMap(np.uint8(255 * cam), cv2.COLORMAP_JET)
    heatmap = cv2.cvtColor(heatmap, cv2.COLOR_BGR2RGB)
    overlay = (0.6 * img_array + 0.4 * heatmap).astype(np.uint8)

    # Convert to base64 string
    result_img = Image.fromarray(overlay)
    buffer = io.BytesIO()
    result_img.save(buffer, format="PNG")
    b64 = base64.b64encode(buffer.getvalue()).decode("utf-8")
    return f"data:image/png;base64,{b64}"