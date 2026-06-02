from rembg import remove
from PIL import Image

input_path = 'logo.jpeg'
output_path = 'public/assets/logo.png'

inp = Image.open(input_path)
output = remove(inp)
output.save(output_path)
print("Background removed successfully!")
