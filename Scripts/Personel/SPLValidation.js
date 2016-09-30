$(function () {
    // datepicker
    $('.date-picker').datepicker({
        //options
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        //...
    });

    //** Validasi form
    $('form').submit(function () {
        //return false;
        var hasError = 0;
        $form = $('form:first');

        //validasi file type
        $.each($form.find('input[type="file"]'), function (i, val) {
            if (!FileValidation($(this))) {
                hasError = hasError + 1;
            }
            if (!FileSize($(this))) {
                hasError = hasError + 1;
            }
        });

        //validasi is required
        $.each($form.find('.required-value'), function (i, val) {
            if (!IsRequired($(this))) {
                hasError = hasError + 1;
            }
        });

        //validasi numeric
        if (!MustNumber($('#TrxLicToeflCertificateViewModel_toefl_test_score'))) {
            hasError = hasError + 1;
        }
        if (!LessThan999MoreThan400($('#TrxLicToeflCertificateViewModel_toefl_test_score'))) {
            hasError = hasError + 1;
        }

        //validasi date form - until
        if (!FromUntilValidate()) {
            hasError = hasError + 1;
        }

        //if hasError has value more than 0 that return false
        if (hasError > 0) {
            return false;
        }
        //return false;
    });

    //validasi is required
    $('.required-value').keyup(function () {
        IsRequired($(this));
    });

    $('.required-value.date-picker').change(function () {
        IsRequired($(this));
        FromUntilValidate();
    });

    // validasi numerik and less than 400
    $('#TrxLicToeflCertificateViewModel_toefl_test_score').keyup(function () {
        if (MustNumber($(this))) {
            LessThan999MoreThan400($(this));
        }
    });

    //validasi file type
    $('input[type="file"]').on("change", function () {
        if (FileValidation($(this))) {
            FileSize($(this));
        }
    });

    function FileValidation(object) {
        var IsValid = true;

        var allowedExtensions = ["jpg", "pdf", "png", "jpeg"];

        var value = $(object).val(),
                    file = value.toLowerCase(),
                    extension = file.substring(file.lastIndexOf('.') + 1);

        if ($(object).val().length > 0) {
            $(object).parent().find('span').remove();
            $(object).parent().removeClass('has-error');
            $(object).parent().removeClass('has-success');

            if ($.inArray(extension, allowedExtensions) == -1) {
                $(object).after('<span class="help-block">Invalid File. Please upload a File with extension: ' + allowedExtensions.join(", ") + '</span>');
                $(object).parent().addClass('has-error');
                IsValid = false;
            }
            else {
                $(object).after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $(object).parent().addClass('has-success');
                IsValid = true;
            }
        }
        return IsValid;
    }

    // validasi file size document upload
    function FileSize(object) {
        var IsValid = true;
        if ($(object).val().length > 0) {
            $(object).parent().find('span').remove();
            $(object).parent().removeClass('has-error');
            $(object).parent().removeClass('has-success');
            var file = $(object)[0].files[0];
            var maxFileSize = $('#DocUploadFormFileSize').val();

            if (file.size > parseInt(maxFileSize) || file.FileSize > parseInt(maxFileSize)) {
                $(object).after('<span class="help-block">The file size to big</span>');
                $(object).parent().addClass('has-error');
                IsValid = false;
            } else {
                $(object).after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $(object).parent().addClass('has-success');
                IsValid = true;
            }
        }
        return IsValid;
    }

    function IsRequired(object) {
        var IsValid = false;
        $(object).parent().find('span').remove();
        $(object).parent().removeClass('has-error');
        $(object).parent().removeClass('has-success');
        var value = $(object).val();
        if (value.length <= 0) {
            $(object).after('<span class="help-block">Is required.</span>');
            $(object).parent().addClass('has-error');
            IsValid = false;
        }
        else {
            $(object).after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
            $(object).parent().addClass('has-success');
            IsValid = true;
        }
        return IsValid;
    }

    function MustNumber(object) {
        var IsValid = true;
        var numericReg = /^\d*[0-9](|.\d*[0-9]|,\d*[0-9])?$/;
        var value = $(object).val();
        if (value.length > 0) {
            $(object).parent().find('span').remove();
            $(object).parent().removeClass('has-error');
            $(object).parent().removeClass('has-success');

            if (!numericReg.test(value)) {
                $(object).after('<span class="help-block">Numeric characters only.</span>');
                $(object).parent().addClass('has-error');
                IsValid = false;
            }
            else {
                var value = parseInt(value);
                $(object).val(value);
                $(object).after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $(object).parent().addClass('has-success');
                IsValid = true;
            }
        }
        return IsValid;
    }

    function LessThan999MoreThan400(object) {
        var IsValid = true;
        var value = $(object).val();
        if (value.length > 0) {
            $(object).parent().find('span').remove();
            $(object).parent().removeClass('has-error');
            $(object).parent().removeClass('has-success');
            if (!(parseInt(value) > 399 && parseInt(value) < 1000)) {
                $(object).after('<span class="help-block">The score not valid</span>');
                $(object).parent().addClass('has-error');
                IsValid = false;
            }
            else {
                $(object).after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $(object).parent().addClass('has-success');
                IsValid = true;
            }
        }
        return IsValid;
    }

    function FromUntilValidate() {
        var IsValid = false;

        $('#TrxLicMedicalCertificateViewModel_until_date').parent().find('span').remove();
        $('#TrxLicMedicalCertificateViewModel_until_date').parent().removeClass('has-error');
        $('#TrxLicMedicalCertificateViewModel_until_date').parent().removeClass('has-success');

        $('#TrxLicMedicalCertificateViewModel_from_date').parent().find('span').remove();
        $('#TrxLicMedicalCertificateViewModel_from_date').parent().removeClass('has-error');
        $('#TrxLicMedicalCertificateViewModel_from_date').parent().removeClass('has-success');

        var from_date = $('#TrxLicMedicalCertificateViewModel_from_date').val();
        var until_date = $('#TrxLicMedicalCertificateViewModel_until_date').val();
        if (from_date.length > 0 && until_date.length > 0) {
            var from = from_date.split('/');
            var fromDate = new Date(from[1] + '/' + from[0] + '/' + from[2]);

            var until = until_date.split('/');
            var untilDate = new Date(until[1] + '/' + until[0] + '/' + until[2]);

            if (fromDate >= untilDate) {
                $('#TrxLicMedicalCertificateViewModel_from_date').after('<span class="help-block">The date range not valid</span>');
                $('#TrxLicMedicalCertificateViewModel_from_date').parent().addClass('has-error');

                $('#TrxLicMedicalCertificateViewModel_until_date').after('<span class="help-block">The date range not valid</span>');
                $('#TrxLicMedicalCertificateViewModel_until_date').parent().addClass('has-error');
                IsValid = false;
            }

            else {
                $('#TrxLicMedicalCertificateViewModel_until_date').after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $('#TrxLicMedicalCertificateViewModel_until_date').parent().addClass('has-success');

                $('#TrxLicMedicalCertificateViewModel_from_date').after('<span class="form-control-feedback pull-left"><i class="fa fa-check"></i></span>');
                $('#TrxLicMedicalCertificateViewModel_from_date').parent().addClass('has-success');
                IsValid = true;
            }
        }
        return IsValid;
    }
});
