"use strict";

const REQUEST_SUPPORTER_CERT_URL = 'https://store.cryptomator.org/api/desktop/request-supporter-cert';

// const REQUEST_SUPPORTER_CERT_URL = 'http://localhost:8787/api/desktop/request-supporter-cert';

class SupporterCertificate {

  constructor(form, feedbackData, submitData) {
    this._form = form;
    this._feedbackData = feedbackData;
    this._submitData = submitData;
  }

  request() {
    if (!$(this._form)[0].checkValidity()) {
      $(this._form).find(':input').addClass('show-invalid');
      return;
    }

    this._feedbackData.success = false;
    this._feedbackData.inProgress = true;
    this._feedbackData.errorMessage = '';
    $.ajax({
      url: REQUEST_SUPPORTER_CERT_URL,
      type: 'POST',
      data: this._submitData
    }).done(_ => {
      this.onRequestSucceeded();
    }).fail(xhr => {
      this.onRequestFailed(xhr.responseJSON?.message || 'Requesting supporter certificate failed.');
    });
  }

  onRequestFailed(error) {
    this._feedbackData.success = false;
    this._feedbackData.inProgress = false;
    this._feedbackData.errorMessage = error;
  }

  onRequestSucceeded() {
    this._feedbackData.success = true;
    this._feedbackData.inProgress = false;
    this._feedbackData.errorMessage = '';
  }

}
