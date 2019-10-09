$(function () {
  function toggleForm(e) {
    e.preventDefault();
    const $input = $(this).parent().find('input');
    const disabledState = !!$input.attr('disabled');
    $(this).parent().toggleClass('disabled');
    $input.attr('disabled', !disabledState);
  }
  $('.formToggle').on('click', toggleForm);
});
