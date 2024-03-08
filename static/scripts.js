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
let country_selection_from_dropdown = ''
// input_load_control
$('#destination_input').on('focus', () => {
    $('#input_load_control').addClass("is-loading");
    $('#open_dropdown').addClass("is-active");
    $('#submit-destination-choice').css("display","none");
    country_selection_from_dropdown = '';
})

// $('#destination_input').on('blur', () => {
//     $('#input_load_control').removeClass("is-loading")
//     $('#open_dropdown').removeClass("is-active")
// });

let selected_dest = ''
// $('.dropdown-item').on('click', () => {

// })



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
                        var itm = this;
                        itm.addEventListener('mouseover', (e) => {
                            $("#" + this.id).addClass("has-background-info-light");
                        });
                        itm.addEventListener('mouseout', (e) => {
                            $("#" + this.id).removeClass("has-background-info-light");
                        });
                        itm.addEventListener('click', (e) => {
                            $('#input_load_control').removeClass("is-loading")
                            $('#open_dropdown').removeClass("is-active")
                            $('#destination_input').val(this.innerText.split('In')[0]);
                            $('#destination_input').addClass("has-background-info-light");
                            $('#submit-destination-choice').css("display","block");
                            country_selection_from_dropdown = this.id;
                            console.log(country_selection_from_dropdown)

                        });
                    })

                    
                }
            },
            error: function(resp){
                $error.text(resp.responseJSON.error).removeClass('error--hidden');
            }
        });

    }
})

let recipesChosen = [];
$('#submit-destination-choice').on('click', () => {
    $('#recipe_content').empty()
    $.ajax({
            url: "/get_recipe_options/".concat(country_selection_from_dropdown),
            type:"GET",
            data: "",
            dataType: "json",
            success: function(resp){
                console.log(resp);;
                const r_list = resp['data']['recipes_english'] // List of recipes
                for (i in r_list) { // loop each recipe
                    const c_rec = r_list[i] // get object of each recipe
                    let recipeHTML = ''
                    recipeHTML += '<div class="box recipe-box" id="'+ c_rec['ID'] + '">\
                                        <div class="field">\
                                            <table class="table">\
                                                <thead>\
                                                    <tr>\
                                                        <td ><strong>' + c_rec['title'] +
                                                        '</strong></td>\
                                                    </tr>\
                                                </thead>\
                                                <tbody>'
                        Object.keys(c_rec).forEach(key => { // for each key in the recipe
                            if (key != 'ID' && key != 'country' && key != 'title'){
                                for (i in c_rec[key]){
                                    const value = c_rec[key][i];
                                    recipeHTML+= '<tr><td>' + value + '</td></tr>'
                                }
                            }
                        })
                        recipeHTML+= '</tbody></table></div></div>'
                        $('#recipe_content').append(recipeHTML)
                    }
                    $('.recipe-box').each(function (e) {
                        // var itm = this
                        this.addEventListener('click',()=>{
                            console.log("clicked");
                            if($('#' + this.id).hasClass("has-background-primary")){
                                let cID = this.id
                                $('#' + this.id).removeClass("has-background-primary")
                                let idxR = recipesChosen.indexOf(cID)
                                recipesChosen.splice(idxR,1);
                                console.log(recipesChosen)
                            }else{
                                $('#' + this.id).addClass("has-background-primary")
                                recipesChosen.push(this.id)
                                console.log(recipesChosen)
                            }


                        })
                    })
                

            },
            error: function(resp){
                $error.text(resp.responseJSON.error).removeClass('error--hidden');
            }
        });

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