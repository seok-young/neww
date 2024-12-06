const models = require("../models/video-models");
const { params } = require("../validators");

module.exports = {  


//=========================== 비디오 =============================//

    /*
   * 비디오 목록 조회 함수 
   */  
    // (sparring, self_defense)
    // params : video_type
    videoAllRead: async (params) => {
        try {
            const db_res = await models.readVideoAll(params);
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoAllRead:", error);        
        }},

    
    // (basic_techniques, forms)
    // params : video_type, character_name
    videoAllReadCharacter: async (params) => {
        try {
            const db_res = await models.readVideoAllCharacter(params);
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoAllReadCharacter:", error);        
        }},


    // (others, moral_education)
    // params : dojang_id, video_type, character_name
    videoAllReadCharacterDojang: async (params) => {
        try {
            const db_res = await models.readVideoAllCharacterDojang(params);
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoAllReadCharacterDojang:", error);        
        }},


    /*
    * 비디오 상세 조회
    */
    videoDetailRead: async (params) => {
        try {
            const db_res = await models.readVideoDetail(params);
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoDetailRead:", error);        
        }},

    

    
    /*
    * 조회수 상승
    */
    viewcountUpdate: async (params,body) => {
        try {
            const db_res = await models.updateViewcount(params,body);
            console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.viewcountUpdate:", error);        
        }},



    /*
    * 비디오 삭제
    */
    videoDelete: async (params) => {
        try {
            const db_res = await models.deleteVideo(params);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoDelete:", error);        
        }},


    /*
    * 비디오 저장
    */
    videoCreate: async (params,body) => {
        // console.log("video-service -> ", params, typeof params);
        // console.log(body, typeof body);
        try {
            const db_res = await models.createVideo(params,body);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoCreate:", error);        
        }},

    /*
    * 비디오 수정 
    */
    videoUpdate: async (params,body) => {
        // console.log("video-service -> ", params, typeof params);
        // console.log(body, typeof body);
        try {
            const db_res = await models.updateVideo(params,body);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.videoCreate:", error);        
        }},


    //=========================== 댓글 =============================//

    /*
    * 댓글 입력 
    */
    commentCreate: async (params,body) => {
        // console.log("video-service -> ", params, typeof params);
        // console.log(body, typeof body);
        try {
            const db_res = await models.createComment(params,body);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.commentCreate:", error);        
        }},

    /*
    * 댓글 조회
    */
    commentRead: async (params) => {
        try {
            const db_res = await models.readComment(params);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.commentRead:", error);        
        }},

    /*
    * 댓글 수 조회
    */
    commentCNT: async (params) => {
        try {
            const db_res = await models.readCommentCNT(params);
            // console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.commentCNT:", error);        
        }},


    /*
    * 댓글 수정
    */
    commentUpdate: async (params,body) => {
        try {
            const db_res = await models.updateComment(params,body);
            console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.commentUpdate:", error);        
        }},

    /*
    * 댓글 삭제
    */
    commentDelete: async (params,body) => {
        try {
            const db_res = await models.deleteComment(params,body);
            console.log(db_res)
            return db_res;
        } catch (error) {
            console.error("Error in video_service.commentDelete:", error);        
        }},
    
};