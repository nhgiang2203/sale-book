//Upload image preview
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    if(e.target.files.length){
      const image = URL.createObjectURL(e.target.files[0]);

      uploadImagePreview.src = image;
    };
  })
}

//Show alert
const showAlert = document.querySelector('[show-alert]');
if(showAlert){
  const time = showAlert.getAttribute('data-time');
  const closeAlert = showAlert.querySelector('[close-alert]');

  setTimeout(() => {
    showAlert.classList.add('alert-hidden');
  }, time);

  closeAlert.addEventListener('click', () => showAlert.classList.add('alert-hidden'));
}