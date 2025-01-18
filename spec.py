import cv2
import numpy as np
import matplotlib.pyplot as plt
from scipy.signal import find_peaks

elements = {
    'Albite': [400, 500],
    'Azurite': [600, 700],
    'Beryl': [400, 500],
    'Biotite': [500, 600],
    'Calcite': [400, 450],
    'Chalcopyrite': [500, 700],
    'Chlorite': [500, 550],
    'Copper': [600, 700],
    'Epidote': [450, 550],
    'Goethite': [480],
    'Gypsum': [450, 500],
    'Hematite': [450],
    'Iron': [400, 500],
    'Kaolinite': [450, 500],
    'Limonite': [500],
    'Magnetite': [400, 700],
    'Malachite': [600, 700],
    'Manganese': [500, 600],
    'Muscovite': [450, 550],
    'Olivine': [400, 500],
    'Orthoclase': [400, 450],
    'Pyrite': [500, 600],
    'Quartz': [400, 500],
    'Rutile': [400, 450],
    'Siderite': [400, 500],
    'Vermiculite': [450, 500],
    'Zinc': [500, 600]
}

def check(elements, peaks, thresh):
    for element, ref_range in elements.items():
        if len(ref_range) == 2: 
            detected = any(ref_range[0] <= peak <= ref_range[1] for peak in peaks)
        else:
            detected = any(abs(peak - ref_range[0]) <= thresh for peak in peaks)
        
        print(element, ':', detected)
        if detected:
            print(f"Detected: {element}")

def graph(simg):
    image = cv2.imread(simg, cv2.IMREAD_GRAYSCALE)

    pixel_positions = np.arange(0, image.shape[1])
    calibration_factor = 2.9
    wavelengths = pixel_positions * calibration_factor
    spectrum = np.sum(image, axis=0)

    peaks = find_peaks(spectrum, height=10, threshold=5, distance=5)
    print("Detected wavelengths:", wavelengths[peaks[0]])

    plt.style.use('Solarize_Light2')
    plt.figure(figsize=(10, 5))
    plt.plot(wavelengths, spectrum, color='b', linewidth=2)
    plt.xlabel('Wavelength (nm)')
    plt.ylabel('Intensity')
    plt.title('Wavelength Spectrum')
    plt.grid(True)
    plt.show()

    check(elements, wavelengths[peaks[0]], 10)

    num_elements = len(elements)
    cols = 4
    rows = (num_elements + cols - 1) // cols  

    fig, axes = plt.subplots(rows, cols, figsize=(15, 5 * rows))
    axes = axes.flatten()  

    for idx, (element, ref_range) in enumerate(elements.items()):
        mini = ref_range[0]
        maxi = ref_range[-1] if len(ref_range) > 1 else ref_range[0] + 50
        axes[idx].plot(wavelengths, spectrum, color='b', linewidth=2)
        axes[idx].set_xlim([mini, maxi])
        for j in ref_range:
            axes[idx].axvline(x=j, color='red', linestyle='dashed')
        axes[idx].set_title(element,fontsize=8)

    for ax in axes[num_elements:]:
        ax.axis('off')

    plt.subplots_adjust(top=0.94, bottom=0.07, left=0.125, right=0.9, hspace=0.4, wspace=0.4)
    mng = plt.get_current_fig_manager()
    mng.full_screen_toggle()
    plt.show()

graph('1.png')

