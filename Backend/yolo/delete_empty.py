import os
import shutil

def copy_matching_pictures(pictures_folder, texts_folder, output_folder):
    # Get a list of text file names without extensions
    text_file_names = [os.path.splitext(file)[0] for file in os.listdir(texts_folder) if file.endswith('.txt')]

    # Create the output folder if it doesn't exist
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Create a list to store text files without matching images
    unmatched_text_files = []

    # Copy pictures that match the text file names to the output folder
    for text_file_name in text_file_names:
        picture_path = os.path.join(pictures_folder, f"{text_file_name}.jpg")
        output_picture_path = os.path.join(output_folder, f"{text_file_name}.jpg")

        if os.path.exists(picture_path):
            shutil.copy(picture_path, output_picture_path)
        else:
            unmatched_text_files.append(f"{text_file_name}.txt")

    # Print the names of text files without matching images
    if unmatched_text_files:
        print("Text files without matching images:")
        for unmatched_file in unmatched_text_files:
            print(unmatched_file)

# Set the paths for your Pictures and Texts folders
pictures_path = r"C:\Users\omerh\Desktop\dataset\datasets\mixed 2\Potato__late_blight"
texts_path = r"C:\Users\omerh\Desktop\obj_train_data"
output_path = r"C:\Users\omerh\Desktop\n"

copy_matching_pictures(pictures_path, texts_path, output_path)
