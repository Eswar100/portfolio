import os
import time
from PIL import Image
import numpy as np
from scipy.ndimage import label
from concurrent.futures import ThreadPoolExecutor

def process_fall_land(filename):
    src = os.path.join('fall-land', filename)
    dst = os.path.join('public', 'assets', 'character', 'fall-land', filename.replace('.png', '.webp'))
    if os.path.exists(dst): return
    im = Image.open(src)
    im.save(dst, 'WEBP', quality=92, method=4)

def process_walk(filename):
    src = os.path.join('walk', filename)
    dst = os.path.join('public', 'assets', 'character', 'walk', filename.replace('.png', '.webp'))
    if os.path.exists(dst): return
    im = Image.open(src)
    im.save(dst, 'WEBP', quality=92, method=4)

def process_wave(filename):
    src = os.path.join('wave', filename)
    dst = os.path.join('public', 'assets', 'character', 'wave', filename.replace('.png', '.webp'))
    if os.path.exists(dst): return
    im = Image.open(src)
    arr = np.array(im)
    black_mask = (arr[:, :, 0] <= 10) & (arr[:, :, 1] <= 10) & (arr[:, :, 2] <= 10)
    labeled, num_features = label(black_mask)
    border_labels = set(np.unique(labeled[0, :])) | set(np.unique(labeled[-1, :])) | set(np.unique(labeled[:, 0])) | set(np.unique(labeled[:, -1]))
    border_labels.discard(0)
    bg_mask = np.isin(labeled, list(border_labels))
    alpha = np.where(bg_mask, 0, 255).astype(np.uint8)
    rgba = np.dstack((arr, alpha))
    out_im = Image.fromarray(rgba)
    out_im.save(dst, 'WEBP', quality=92, method=4)

if __name__ == '__main__':
    t0 = time.time()
    os.makedirs('public/assets/character/fall-land', exist_ok=True)
    os.makedirs('public/assets/character/walk', exist_ok=True)
    os.makedirs('public/assets/character/wave', exist_ok=True)

    print("Converting assets to web-optimized WebP (preserving 1080p resolution and character transparency)...")
    with ThreadPoolExecutor(max_workers=8) as executor:
        list(executor.map(process_fall_land, sorted(os.listdir('fall-land'))))
        print("fall-land processed.")
        list(executor.map(process_walk, sorted(os.listdir('walk'))))
        print("walk processed.")
        list(executor.map(process_wave, sorted(os.listdir('wave'))))
        print("wave processed.")

    print(f"Finished asset optimization in {time.time() - t0:.2f} seconds!")
