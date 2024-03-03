$("form[name=signup_form").submit(function(e){

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();

    $.ajax({
        url:"/user/signup",
        type:"POST",
        data: data,
        dataType: "json",
        success: function(resp){
            window.location.href = "/dashboard";
        },
        error: function(resp){
            $error.text(resp.responseJSON.error).removeClass('error--hidden');
        }
    });

    e.preventDefault();

})


$("form[name=signin_form").submit(function(e){

    var $form = $(this);
    var $error = $form.find(".error");
    var data = $form.serialize();

    $.ajax({
        url:"/user/signin",
        type:"POST",
        data: data,
        dataType: "json",
        success: function(resp){
            window.location.href = "/dashboard";
        },
        error: function(resp){
            $error.text(resp.responseJSON.error).removeClass('error--hidden');
        }
    });

    e.preventDefault();

})

// input_load_control
$('#destination_input').on('focus', () => {
    $('#input_load_control').addClass("is-loading")
    $('#open_dropdown').addClass("is-active")
})

$('#destination_input').on('blur', () => {
    $('#input_load_control').removeClass("is-loading")
    $('#open_dropdown').removeClass("is-active")
});

let selected_dest = ''
// $('.dropdown-item').on('click', () => {

// })

let country_selection_from_dropdown = ''

$('#destination_input').on('keyup', () => {
    country_selection_from_dropdown = ''
    if ($('#destination_input').val() == '') {
        console.log("test")
    }else{
        $.ajax({
            url: "/get_destination_data/".concat($('#destination_input').val()),
            type:"GET",
            data: "",
            dataType: "json",
            success: function(resp){
                if (resp.length > 20) {
                    var html = '<div class="dropdown-item">'
                    html+= '<p class="is-size-7 has-text-right is-italic"> Keep typing to find your destination</p></div>'

                    $('#destination_result_dropdown').empty()
                    $('#destination_result_dropdown').html(html)
                    // <div class="dropdown-item">
                    //                     <p><strong>Dublin</strong></p>
                    //                     <p class="is-size-7 has-text-right is-italic"> A city in Dublin, Ireland</p>
                    //                 </div>
                    //                 <hr class="dropdown-divider"></hr>
                }else{
                    console.log(resp)
                    $('#destination_result_dropdown').empty()
                    for (let loca in resp){
                        var html = '<div class="dropdown-item" id="' + resp[loca]['id'] + '">'
                        html+='<p><strong>' + resp[loca]['name'] + '</strong></p>'
                        html+='<p class="is-size-7 has-text-right is-italic">' + resp[loca]['blurb'] + '</p>'
                        html+='</div>'
                        html+='<hr class="dropdown-divider"></hr>'

                        $('#destination_result_dropdown').append(html)
                    }
                    $('.dropdown-item').each(function (e) {
                        console.log("Adding Listeners")
                        var itm = this;
                        this.addEventListener('click', (e) => {
                            console.log("clicked");
                        })
                    })

                    
                }
            },
            error: function(resp){
                $error.text(resp.responseJSON.error).removeClass('error--hidden');
            }
        });

    }
})


bulmaCarousel.attach('#carousel-demo', {
			slidesToScroll: 1,
			slidesToShow: 4
});

$(function() {
    $('input[name="daterange"]').daterangepicker({
      opens: 'left'
    }, function(start, end, label) {
      console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
  });