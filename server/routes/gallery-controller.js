const express = require("express");
const fs = require("fs");
const path = require("path");
const { wrap } = require("../errorHandler");
const services = require("../services/gallery-services");
const validators = require("../validators");

const group = express.Router();
const router = express.Router();


group.use("/gallery", router);



//========================== 사진 ==============================//

/*
* 사진 타입 선택
*/

router.get(
    "/all/read/:dojang_id",
    wrap(async (req, res) => {
      try {
        const result = await services.phototypeRead();
        res.send(result);
      } catch (error) {
        console.error("Error in v4/gallery/all/read/:dojang_id", error);
        res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
      }
    })
  ); 

/*
* 사진 타입별 목록 조회
*/

// router.get(
//     "/all/read/:dojang_id/:photo_type",
//     wrap(async (req, res) => {
//         const params = req.params       
//           const result = await services.phototypeReadAll(params);          
//           const base64Images = [];
//           // 이미지 저장 경로
//           const baseDir = __dirname;
//           const imagesFolderPath = path.join(baseDir, 'images');
//           console.log(imagesFolderPath)

//           result.forEach(item => {
//             // 상대 경로로 변환된 파일 경로
//             const filePath = path.join(imagesFolderPath, item.PHOTO_TITLE + '.jpg'); // 파일 이름 확장자 추가 필요
//             console.log(`Attempting to read: ${filePath}`);

          
//           }}
//     ));
            


      
   

/*
* 사진 상세 보기
*/

router.get(
    "/detail/read/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params
        try {
            // 사진게시글 불러오기
            const result = await services.photoReadDetail(params);
            
            // 댓글 불러오기
            const comment = await services.commentRead(params);

            res.send([
                result,
                comment]);
        } catch (error) {
            console.error("Error in /detail/read/:dojang_id/:photo_type/:photo_id", error);
            res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    ); 

/*
* 사진 게시글 삭제
*/
router.delete(
    "/detail/read/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params;
        try {
          const result = await services.photoDelete(params);
          res.send(result);
        } catch (error) {
          console.error("Error in -delete- v4/gallery/detail/read/:dojang_id/:photo_type/:photo_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    );
 


/*
* 사진 게시글 저장
*/
router.get(
    "/detail/create/:dojang_id",
    wrap(async (req, res) => {
        const params = req.params;
        const body = req.body;
        try {
          const result = await services.photoCreate(params, body);
          res.send(result);
        } catch (error) {
          console.error("Error in v4/gallery/detail/create/:dojang_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    );

/*
* 사진 게시글 수정
*/
router.put(
    "/detail/update/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params;
        const body = req.body;
        try {
          const result = await services.photoUpdate(params, body);
          res.send(result);
        } catch (error) {
          console.error("Error in v4/gallery/detail/update/:dojang_id/:photo_type/:photo_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    ); 

//========================== 댓글 ==============================//

/*
* 댓글 생성
*/
router.post(
    "/detail/read/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params;
        const body = req.body;
        try {
          const result = await services.commentCreate(params, body);
          res.send(result);
        } catch (error) {
          console.error("Error in -post- v4/gallery/detail/update/:dojang_id/:photo_type/:photo_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    ); 

/*
* 댓글 수정
*/
router.patch(
    "/detail/read/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params;
        const body = req.body;
        try {
          const result = await services.commentUpdate(params, body);
          res.send(result);
        } catch (error) {
          console.error("Error in -patch- v4/gallery/detail/update/:dojang_id/:photo_type/:photo_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    ); 


/*
* 댓글 삭제
*/    
router.put(
    "/detail/read/:dojang_id/:photo_type/:photo_id",
    wrap(async (req, res) => {
        const params = req.params;
        const body = req.body;
        try {
          const result = await services.commentDelete(params,body);
          res.send(result);
        } catch (error) {
          console.error("Error in -put- v4/gallery/detail/update/:dojang_id/:photo_type/:photo_id", error);
          res.sendStatus(500);  // 에러 발생 시 상태 코드 500만 반환
        }
      })
    ); 

    module.exports = group;