$(document).ready(function(){//DOMツリーの構築が終了次第実行される
  function score_indicate(){
    // このような記述をすることで、subject_pointsという変数の中に
    // [国語の点数,英語の点数,数学の点数,理科の点数,社会の点数]という配列を作成できる。
    let subject_points = [Number($('#national_language').val()),
                          Number($('#english').val()),
                          Number($('#mathematics').val()),
                          Number($('#science').val()),
                          Number($('#society').val())
                          ];

    // さらにこのような記述をすることで、「合計点：」となっている右の部分に合計点が出力される
    let sum = subject_points[0];
    sum = sum + subject_points[1];
    sum = sum + subject_points[2];
    sum = sum + subject_points[3];
    sum = sum + subject_points[4];
    $("#sum_indicate").text(sum);

    // ここに、上記を参考にして平均点を出力する処理を書き込む
    let average = sum / subject_points.length;
    $('#avarage_indicate').text(average);
    return Array(average,subject_points);
  };

  function get_achievement(g_avg){
    // ここに、ランクの値の文字列（平均点が80点以上なら"A"、60点以上なら"B"、40点以上なら"C"、それ以下なら"D"）を出力する処理を書き込む
    let avg = g_avg[0]
    let rank;
    switch (true) {
        case avg >= 80:
            rank = "A";
            break;
        case avg >= 60:
            rank = "B";
            break;
        case avg >= 40:
            rank = "C";
            break;
        default:
            rank = "D";
            break;
    }
    $('#evaluation').text(rank);
    return rank;
  }

  function get_pass_or_failure(g_scr){
    // ここに、全ての教科が60点以上なら"合格"の文字列、一つでも60点未満の教科があったら"不合格"の文字列を出す処理を書き込む
    let result = "合格"
    for ( let i=0 ; i < g_scr[1].length ; i++ ){
      if ( g_scr[1][i] < 60){
        result = "不合格";
      }
    }
    $('#judge').text(result);
    return result;
  }

  function judgement(){
    // ここに、「最終ジャッジ」のボタンを押したら「あなたの成績はAです。合格です」といった内容を出力する処理を書き込む
    // 下記の記述をすることで、「最終ジャッジ」のボタンを押すと「あなたの成績は（ここに「ランク」の値を入れる）です。（ここに「判定」の値を入れる）です」という文字の入った水色のフキダシが出力される処理が実装される。
    let rank = get_achievement(score_indicate());
    let judge = get_pass_or_failure(score_indicate());
    $('#declaration').empty().append(`<label id="alert-indicate" class="alert alert-info">あなたの成績は${rank}です。${judge}です</label>`);
  };
  $('#national_language, #english, #mathematics, #science, #society').click(function() {
    $(this).val('');
  });
  $('#national_language, #english, #mathematics, #science, #society').change(function() {
    //各教科のinputに対してvalueの変化があれば、score_indicate()関数を実行
    let $this = $(this);
    if( $this.val() > 100 ){
      alert('100点満点で記入してください。');
      $this.val('0');
    }
    score_indicate();
  });

  $('#btn-evaluation').click(function() {
    //『ランク』のlabel要素がクリックされたら、get_achievement()関数を実行
    get_achievement(score_indicate());
  });

  $('#btn-judge').click(function() {
    get_pass_or_failure(score_indicate());
  });

  $('#btn-declaration').click(function() {
    judgement();
  });
});
