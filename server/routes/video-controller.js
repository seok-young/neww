const express = require("express");
const { wrap } = require("../errorHandler");
const services = require("../services/video-services");
const validators = require("../validators");

const group = express.Router();
const router = express.Router();

group.use("/video", router);

 //=========================== 비디오 =============================//

/*
* 비디오 타입 선택 후 
* (기본동작, 품새) -> 캐릭터 선택창으로 리다이렉트
* (겨루기, 호신술, 인성교육, 기타) -> 목록 불러오기
* params : { video_type }           -------> 사용X
*/  

router.get(
  "/all/read/:video_type",
  wrap(async (req, res) => {
    const params = req.params
    const video_type = req.params.video_type;
    console.log('video_type:', video_type, typeof video_type);

    console.log(params, typeof params);
    if (video_type=="basic_techniques" || video_type=="forms") {
      // return res.redirect('/all/read/:video_type/characters') 캐릭터 선택창
      return res.send("캐릭터 선택하세요")
    } else {
      try {     
        const result = await services.videoAllRead(params);
        res.send(result);
      } catch (error) {
        console.error("Error in /all/read/:video_type route:", error);
        res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
      }}}
  )
);


/*
* (기본동작, 품새) 캐릭터 선택 후
* 비디오 목록 불러오기
* params : { video_type, character_name }
*/
router.get(
  "/all/read/:video_type/:character_name",
  wrap(async (req, res) => {
    const params = req.params
    console.log(params, typeof params);
    try {
      const result = await services.videoAllReadCharacter(params);
      res.send(result);
    } catch (error) {
      console.error("Error in /all/read/:video_type/:character_name route:", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
); 

/*
* 비디오 목록 불러오기 --- dojang_id 파라미터 추가
* params : { video_type, character_name, dojang_id }
*/
router.get(
  "/all/read/:dojang_id/:video_type/:character_name",
  wrap(async (req, res) => {
    const params = req.params
    console.log(params, typeof params);
    // 비디오 타입이 예절교육 혹은 기타인 경우
    if ( ( params.video_type == "예절교육" ) || ( params.video_type == "기타" ) ) {
      try {
        const result = await services.videoAllReadCharacterDojang(params);
        res.send(result);
      } catch (error) {
        console.error("Error in /all/read/:dojang_id/:video_type/:character_name - [others,moral_education]", error);
        res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
      }
    // 그 외 비디오 타입
    } else {
      try {
        const result = await services.videoAllReadCharacter(params);
        res.send(result);
      } catch (error) {
        console.error("Error in /all/read/:dojang_id/:video_type/:character_name - [etc]", error);
        res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
      }

    }
    
  })
); 


/*
* 비디오 상세 보기
* params : { dojang_id, video_id }
*/
router.get(
  "/detail/read/:dojang_id/:video_id",
  wrap(async (req, res) => {
    const params = req.params
    const body = req.body
    console.log(params, typeof params);
    try {
      // 조회수 상승
      // await services.viewcountUpdate(params,body);

      // 비디오 조회
      const videoDetail = await services.videoDetailRead(params);

      // 댓글 조회
      const comment = await services.commentRead(params);

      // 댓글 수 조회
      const comment_cnt = await services.commentCNT(params);

      res.send({
        videoDetail,
        comment,
        comment_cnt
      });
    } catch (error) {
      console.error("Error in -GET- /detail/read/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
);


/*
* 비디오 삭제('tb_video -> deleted =1' 로 수정)
* params : { dojang_id, video_id }
*/
router.post(
  "/detail/read/:dojang_id/:video_id",
  wrap(async (req, res) => {
    const params = req.params   
    
    console.log(params, typeof params);
    try {
      const result = await services.videoDelete(params);
      
      if (result.success){
        // 삭제 성공
        console.log(result.message);
        res.redirect(`v3/video/all/read/:dojang_id/:video_type/:character_name`) // 도장별 비디오 목록페이지로 리다이렉트
      } else {
        // 삭제 실패
        console.log(result.message);
        res.status(404).send(result.message);
      }       
    } catch (error) {
      console.error(`Error in /kw/read/:dojang_id/:video_id`, error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
);


/*
* 비디오 저장
*/
router.post(
  "/kw/create/:dojang_id",
  wrap(async (req, res) => {
    const params = req.params
    const body = req.body
    
    // console.log(params, typeof params);
    // console.log(body, typeof body);
    try {
      const result = await services.videoCreate(params,body);
      
      if (result.success){
        // 저장 성공
        console.log(result.message);
        res.send(result) 
      } else {
        // 저장 실패
        console.log(result.message);
        res.status(404).send(result.message);
      }       
    } catch (error) {
      console.error(`Error in /kw/create/:dojang_id`, error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
);


/*
* 비디오 수정페이지 로드
* params : { video_id }
*/
router.get(
  "/kw/update/:dojang_id/:video_id",
  wrap(async (req,res) => {
    const params = req.params;    
    console.log(params, typeof params);
    try {
      const result = await services.videoDetailRead(params);
      res.send(result);
    } catch (error) {
      console.error("Error in /kw/update/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
);


/*
* 비디오 수정이후 저장(제목, 설명)
* params : { video_id, video_title, video_description }
* 나중에 영상 수정도 구현★★★★
*/
router.post(
  "/kw/update/:dojang_id/:video_id",
  wrap(async (req,res) => {
    const params = req.params;    
    const body   = req.body;
    // console.log(params, typeof params);
    try {
      const result = await services.videoUpdate(params,body);
      res.send(result);
    } catch (error) {
      console.error("Error in /kw/update/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  }),


//=========================== 댓글 =============================//

/*
* 비디오 댓글 입력
* params : { dojang_id, video_id }
*/
router.put(
  "/detail/read/:dojang_id/:video_id",
  wrap(async (req, res) => {
    const params = req.params
    const body = req.body
    console.log(params, typeof params);
    try {      
      const result = await services.commentCreate(params, body);
      res.send(result);
    } catch (error) {
      console.error("Error in -POST- /detail/read/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
),


/*
* 비디오 댓글 수정
* params : { dojang_id, video_id, comment_id, comment_content }
*/
router.patch(
  "/detail/read/:dojang_id/:video_id",
  wrap(async (req, res) => {
    const params = req.params
    const body = req.body
    console.log(params, typeof params);
    try {      
      const result = await services.commentUpdate(params, body);
      res.send(result);
    } catch (error) {
      console.error("Error in -PATCH- /detail/read/:dojang_id/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
),

/*
* 비디오 댓글 삭제
* params : { dojang_id, video_id, comment_id }
*/
router.delete(
  "/detail/read/:dojang_id/:video_id",
  wrap(async (req, res) => {
    const params = req.params
    const body = req.body
    console.log(params, typeof params);
    try {      
      const result = await services.commentDelete(params, body);
      res.send(result);
    } catch (error) {
      console.error("Error in -DELETE- /detail/read/:dojang_id/:video_id", error);
      res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
    }
  })
),








)

  
module.exports = group;