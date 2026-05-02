from PIL import Image
import io

def load_image(file_bytes: bytes) -> Image.Image:
    image = Image.open(io.BytesIO(file_bytes)).convert("RGB")
    return image