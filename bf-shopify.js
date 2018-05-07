window.variantId = 48679630869;
window.shouldCheckByDefault = true;

function bf_check() {

  jQuery.getJSON('/cart.js',function(data){
    var items = data['items'];

    if (window.shouldCheckByDefault && (!localStorage.getItem("isReturningUser") || localStorage.getItem("isReturningUser") == "false")  && items.length > 0) {
      localStorage.setItem("isReturningUser", true);
      $("#bf_contribution").attr('checked', true);
      bf_contribution_add();
    }
     
    else {
      for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].id == window.variantId && items.length == 1) {
          $("#bf_contribution").attr('checked', false);
          bf_contribution_add();
          break;
        }
        
        else if (items[i].id == window.variantId) {
          $("#bf_contribution").attr('checked', true);
          break;
        }
        
      }
    }

  });

}

function bf_precheck_reset() {
	localStorage.setItem("isReturningUser", false);
}

function bf_contribution_add() {

  var quantity = 0

  if ($("#bf_contribution").is(':checked')) {
    quantity = 1
  }

  jQuery.post('/cart/update.js', "updates["+window.variantId+"]="+quantity, function(result) {
    location.reload();
  }, 'json');
}

if (window.location.href.includes('cart')){
  bf_check();
}