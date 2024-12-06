const models = require("../models/gallery-models");
const { params } = require("../validators");

module.exports = {  

    //=========================== 사진 =============================//

    /*
   * 사진 타입 조회 함수 
   */  
    phototypeRead: async () => {
        try {
            const db_res = await models.readPhototype();
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.phototypeRead:", error);        
        }},

    /*
   * 사진 타입별 목록 조회 함수 
   */  
    phototypeReadAll: async (params) => {
        try {
            const db_res = await models.readallPhototype(params);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.phototypeReadAll:", error);        
        }},

    /*
   * 사진 상세 조회 함수 
   */  
    photoReadDetail: async (params) => {
        try {
            const db_res = await models.readDetailPhoto(params);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.photoReadDetail:", error);        
        }},

    /*
   * 사진 삭제 함수 
   */  
    photoDelete: async (params) => {
        try {
            const db_res = await models.deletePhoto(params);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.photoDelete:", error);        
        }},

    /*
   * 사진 게시글 저장 함수 
   */  
    photoCreate: async (params, body) => {
        try {
            const db_res = await models.createPhoto(params, body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.photoCreate:", error);        
        }},

    /*
   * 사진 게시글 수정 함수 
   */  
    photoUpdate: async (params, body) => {
        try {
            const db_res = await models.updatePhoto(params, body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.photoUpdate:", error);        
        }},

//========================== 댓글 ==============================//

    /*
   * 댓글 조회 함수 
   */  
    commentRead: async (params, body) => {
        try {
            const db_res = await models.readComment(params, body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.commentRead:", error);        
        }},

    /*
   * 댓글 생성 함수 
   */  
    commentCreate: async (params, body) => {
        try {
            const db_res = await models.createComment(params, body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.commentCreate:", error);        
        }},

    /*
   * 댓글 수정 함수 
   */  
    commentUpdate: async (params, body) => {
        try {
            const db_res = await models.updateComment(params, body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.commentUpdate:", error);        
        }},


    /*
   * 댓글 삭제 함수 
   */  
       commentDelete: async (params,body) => {
        try {
            const db_res = await models.deleteComment(params,body);
            return db_res;
        } catch (error) {
            console.error("Error in gallery_service.commentDelete:", error);        
        }},

}