const MakeError = require("../MakeError");
const _ = require("lodash");
const {connectionWrap } = require("../errorHandler");
const { params } = require("../validators");
const path =require("path");

function getPhotoExtension(photoPath) {
    return photoPath.split('.').pop();
}

module.exports = {

    //=========================== 사진 =============================//        
   
    /*
    * 사진 타입 조회 
    * params : {  }
    */ 
    readPhototype: async () => {
        try {          
                const query = `CALL UP_FT_PHOTO_TYPE_SELECT()`;
                const result = await connectionWrap(async (conn) => {
                    const [res] = await conn.query(query );
                    return res;
                });
                return result; 
        } catch (error) {
            console.error("Error in gallery-models.readPhototype:", error.message); // 에러 메시지 출력
        }
    },


    /*
    * 사진 타입별 목록 조회 
    * params : { dojang_id, photo_type }
    */ 
    readallPhototype: async (params) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_type = params.photo_type;
                
                const query = `CALL UP_FT_PHOTO_SELECT_ALL_TY(?,?)`;
                const result = await connectionWrap(async (conn) => {
                     [[res]] = await conn.query(query,[dojang_id, photo_type] );
                    return res;
                });
                // console.log(result);
                return result; 
        } catch (error) {
            console.error("Error in gallery-models.readallPhototype:", error.message); // 에러 메시지 출력
        }
    },

    /*
    * 사진 상세 조회 
    * params : { dojang_id, photo_type, photo_id }
    */ 
    readDetailPhoto: async (params) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_type = params.photo_type;
                const photo_id = params.photo_id;                
                const query = `CALL UP_FT_PHOTO_SELECT_DETAIL(?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                     [[res]] = await conn.query(query,[dojang_id, photo_type, photo_id] );
                    return res;
                });
                return result; 
        } catch (error) {
            console.error("Error in gallery-models.readDetailPhoto:", error.message); // 에러 메시지 출력
        }
    },

    /*
    * 사진 삭제
    * params : { dojang_id, photo_type, photo_id }
    */ 
    deletePhoto: async (params) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_type = params.photo_type;
                const photo_id = params.photo_id;                
                const query = `CALL UP_FT_PHOTO_DELETE(?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                     [res] = await conn.query(query,[dojang_id, photo_type, photo_id] );
                    return res;
                });
                if (result.affectedRows > 0){                
                    return { success: true, message: `Delete photo Succeeded.`}
                } else {
                    return { success: false, message: `Delete photo failed.`}
                }  
        } catch (error) {
            console.error("Error in gallery-models.deletePhoto:", error.message); // 에러 메시지 출력
        }
    },

    /*
    * 사진 게시글 저장 
    * params : { DOJANG_ID, PHOTO_TYPE, PHOTO_TITLE, PHOTO_PATH, PHOTO_EXTENSION, PHOTO_CONTENT }
    */ 
    createPhoto: async (params, body) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_type = body.photo_type;
                const photo_title = body.photo_title;
                const photo_path = body.photo_path;
                const photo_extension = await getPhotoExtension(photo_path);
                const photo_content = body.photo_content;                         
                const query = `CALL UP_FT_PHOTO_CREATE(?,?,?,?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                     [res] = await conn.query(query,[
                        dojang_id, 
                        photo_type, 
                        photo_title,
                        photo_path,
                        photo_extension,
                        photo_content
                    ] );
                    return res;
                });                
                if (result.affectedRows > 0){                
                    return { success: true, message: `Create photo Succeeded.`}
                } else {
                    return { success: false, message: `Create photo failed.`}
                } 
        } catch (error) {
            console.error("Error in gallery-models.createPhoto:", error.message); // 에러 메시지 출력
        }
    },


    /*
    * 사진 게시글 수정 
    * params : { DOJANG_ID, PHOTO_TYPE, PHOTO_ID, PHOTO_TITLE, PHOTO_CONTENT }
    */ 
    updatePhoto: async (params, body) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_type = params.photo_type;
                const photo_id = params.photo_id;
                const photo_title = body.photo_title;               
                const photo_content = body.photo_content;                         
                const query = `CALL UP_FT_PHOTO_UPDATE(?,?,?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                     [res] = await conn.query(query,[
                        dojang_id, 
                        photo_type, 
                        photo_id,
                        photo_title,
                        photo_content,
                    ] );
                    return res;
                });                
                if (result.affectedRows > 0){                
                    return { success: true, message: `Update photo Succeeded.`}
                } else {
                    return { success: false, message: `Update photo failed.`}
                } 
        } catch (error) {
            console.error("Error in gallery-models.updatePhoto:", error.message); // 에러 메시지 출력
        }
    },

//========================== 댓글 ==============================//


    /*
    * 댓글 조회 
    * params : { dojang_id, photo_type, photo_id }
    */ 
    readComment: async (params) => {
        try {         
                const dojang_id = params.dojang_id;
                const photo_id = params.photo_id;                         
                const query = `CALL UP_FT_COMMENT_SELECT_PHOTO(?,?)`;
                const result = await connectionWrap(async (conn) => {
                    [[res]] = await conn.query(query,[dojang_id, photo_id] );
                    return res;
                });
                return result; 
        } catch (error) {
            console.error("Error in gallery-models.readComment:", error.message); // 에러 메시지 출력
        }
    },


    /*
    * 댓글 생성 
    * params : { dojang_id, photo_id, comment_content }
    */ 
    createComment: async (params, body) => {
        try {         
            const dojang_id = params.dojang_id;
            const photo_id = params.photo_id;
            const comment_content = body.comment_content;                         
            const query = `CALL UP_FT_COMMENT_CREATE_PHOTO(?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                [res] = await conn.query(query,[dojang_id, photo_id, comment_content] );
                return res;
            });
            if (result.affectedRows > 0){                
                return { success: true, message: `Create comment for PHOTO Succeeded.`}
            } else {
                return { success: false, message: `Create comment for PHOTO failed.`}
            } 
        } catch (error) {
        console.error("Error in gallery-models.createComment:", error.message); // 에러 메시지 출력
        }
    },

    /*
    * 댓글 수정 
    * params : {DOJANG_ID, PHOTO_ID, COMMENT_ID, COMMENT_CONTENT}
    */ 
    updateComment: async (params, body) => {
        try {         
            const dojang_id = params.dojang_id;
            const photo_id = params.photo_id;
            const comment_id = body.comment_id;
            const comment_content = body.comment_content;                         
            const query = `CALL UP_FT_COMMENT_UPDATE_PHOTO(?,?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                [res] = await conn.query(query,[dojang_id, photo_id, comment_id, comment_content] );
                return res;
            });
            if (result.affectedRows > 0){                
                return { success: true, message: `Update comment for PHOTO Succeeded.`}
            } else {
                return { success: false, message: `Update comment for PHOTO failed.`}
            } 
        } catch (error) {
        console.error("Error in gallery-models.updateComment:", error.message); // 에러 메시지 출력
        }
    },


    /*
    * 댓글 삭제 
    * params : {DOJANG_ID, PHOTO_ID, COMMENT_ID}
    */ 
    deleteComment: async (params,body) => {
        try {         
            const dojang_id = params.dojang_id;
            const photo_id = params.photo_id;
            const comment_id = body.comment_id;                                       
            const query = `CALL UP_FT_COMMENT_DELETE_PHOTO(?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                [res] = await conn.query(query,[dojang_id, photo_id, comment_id] );
                return res;
            });
            if (result.affectedRows > 0){                
                return { success: true, message: `Delete comment for PHOTO Succeeded.`}
            } else {
                return { success: false, message: `Delete comment for PHOTO failed.`}
            } 
        } catch (error) {
        console.error("Error in gallery-models.deleteComment:", error.message); // 에러 메시지 출력
        }
    },



    }