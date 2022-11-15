// 버튼 0누르면
// 모든 버튼에 붙은 orange 클래스 제거
// 버튼 0에 붙은 orange 클래스 추가
// 모든 div에 붙은 show 클래스 제거
// div에 show 클래스명 추가


for(let i=0; i<3; i++){
    $('.tab-button').eq(i).click(function(){
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(i).addClass('orange') 
    // $(this).addClass('orange');
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(i).addClass('show');
});    
}


$('.list').click(function(e){
    탭열기(e.target.dataset.id)
})

function 탭열기(숫자){
    $('.tab-button').removeClass('orange');
    $('.tab-button').eq(숫자).addClass('orange') 
    $('.tab-content').removeClass('show');
    $('.tab-content').eq(숫자).addClass('show');
}