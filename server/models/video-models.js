const MakeError = require("../MakeError");
const _ = require("lodash");
const {connectionWrap } = require("../errorHandler");
const { params } = require("../validators");
const path =require("path");

function getVideoExtension(videoPath) {
    return videoPath.split('.').pop();
}

module.exports = {

 //=========================== 비디오 =============================//
     
    /* video_type
    * 기본동작 :  basic-techniques
    * 품새 : forms
    * 겨루기 : sparring
    * 호신술 : self-defense
    * 기타 : others
    * 인성교육 : moral-education
    */

    /*
   * 비디오 타입별 목록 조회 (캐릭터 파라미터가 없는 경우)
   * params : { video_type }
   */ 
    readVideoAll: async (params) => {
        const video_type = params.video_type;
        
        console.log('video_type:', video_type, typeof video_type); // 디버깅용 로그
        console.log(params, typeof params);
        try {            
            if (["sparring", "self_defense", "others", "moral_education"].includes(video_type)){
                const query = `CALL UP_FT_VIDEO_SELECT_ALL(?)`;
                const result = await connectionWrap(async (conn) => {
                    const [[res]] = await conn.query(query, [video_type]);
                    return res;
                });
                return result; // video_type이 조건에 맞는 경우만 반환
            } else {
                console.warn('video_type이 유효하지 않습니다:', video_type); // 조건에 맞지 않는 경우 경고 로그 
            }
        } catch (error) {
            console.error("Error in video-models.readVideoTypeAll:", error.message); // 에러 메시지 출력
        }
    },

    /*
   * 비디오 타입별 목록 조회 (캐릭터 파라미터가 있는 경우)
   * params : { dojang_id, video_type, character_name }
   */ 
    readVideoAllCharacter: async(params) => {
        console.log(params, typeof params);
        const video_type = params.video_type;
        const character_name = params.character_name;  
        const dojang_id = params.dojang_id;    

        try {             
            if (["basic_techniques", "forms"].includes(video_type)){
                const query = `CALL UP_FT_VIDEO_SELECT_ALL_CH(?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                    const [[res]] = await conn.query(query, [dojang_id,video_type,character_name]);
                    return res;
                });
                return result; // video_type이 조건에 맞는 경우만 반환
            } else {
                console.warn('video_type이 유효하지 않습니다:', video_type); // 조건에 맞지 않는 경우 경고 로그 
            }
        } catch (error) {
            console.error("Error in video-models.readVideoAllCharacter:", error.message); // 에러 메시지 출력
        }
    },

    /*
   * 비디오 타입별 목록 조회 (예절교육, 기타)
   * params : { dojang_id, video_type, character_name, dojang_id }
   */ 
    readVideoAllCharacterDojang: async(params) => {
        console.log(params, typeof params);
        const video_type = params.video_type;
        const character_name = params.character_name;
        const dojang_id = params.dojang_id;
        try {            
                const query = `CALL UP_FT_VIDEO_SELECT_ALL_CH_DO(?,?,?)`;
                const result = await connectionWrap(async (conn) => {
                    const [[res]] = await conn.query(query, [dojang_id, video_type, character_name]);
                    return res;
                });
                return result; 
        } catch (error) {
            console.error("Error in video-models.readVideoAllCharacterDojang:", error.message); // 에러 메시지 출력
        }
    },
    

    /*
   * 비디오 상세 조회
   * params : { VIDEO_ID }
   */ 
    readVideoDetail: async(params) => {
        // console.log(params, typeof params);
        const video_id = params.video_id;
        // console.log("video-models : ",video_id, typeof video_id);
        try {
            const query = `CALL UP_FT_VIDEO_SELECT_DETAIL(?)`;
            const result = await connectionWrap(async (conn) => {
                const [[res]] = await conn.query(query, [video_id]);
                return res;
            });
            console.log(result)
            return result;
        } catch (error) {
            console.error("Error in video-models.readVideoDetail:", error.message);
        }
    },

    /*
    * 비디오 조회수 업데이트
    * params : { video_id, view_count }
    */
    updateViewcount: async(params,body) => {
        // console.log(params, typeof params);
        const video_id = params.video_id;
        const view_count = body.view_count;
        try {
            const query = `CALL UP_FT_VIEWCOUNT_UPDATE(?,?)`;
            const result = await connectionWrap(async (conn) => {
                const[res] = await conn.query(query, [video_id, view_count]);
                return res;
            });
            console.log(result)
            if (result.affectedRows > 0){                
                return { success: true, message: `Viewcount update Succeeded.`}
            } else {
                return { success: false, message: `Viewcount update failed.`}
            }          
            
        } catch (error) {
            console.error("Error in video-models.updateViewcount:", error.message);
        }
    },



    /*
    * 비디오 삭제
    * params : { dojang_id, video_id }
    */
    deleteVideo: async(params) => {
        console.log(params, typeof params);
        const dojang_id = params.dojang_id;
        const video_id = params.video_id;
        
        try {
            const query = `CALL UP_FT_VIDEO_DELETE(?,?)`;
            const result = await connectionWrap(async (conn) => {
                const[res] = await conn.query(query, [dojang_id,video_id,comment_id]);
                return res;
            });
            if (result.affectedRows > 0){                
                return { success: true, message: `Video deleted successfully.`}
            } else {
                return { success: false, message: `Video already deleted OR No video found with the Given ID.`}
            }          
            
        } catch (error) {
            console.error("Error in video-models.deleteVideo:", error.message);
        }
    },
   

    /*
    * 비디오 메타데이터 DB 저장  
    * params : { COUNTRY_CODE, DOJANG_ID, VIDEO_TYPE, VIDEO_PATH, 
    * VIDEO_TIME, VIDEO_TITLE, VIDEO_DESCRIPTION, VIDEO_EXTENSION }
    */  

    createVideo: async(params,body) => {
        try {
            const query = `CALL UP_FT_VIDEO_CREATE(?,?,?,?,?,?,?)`;
            const video_extension = getVideoExtension(body.video_path)
            const result = await connectionWrap(async (conn) => {
                const[res] = await conn.query(query, [ 
                    params.dojang_id, 
                    body.video_type,
                    body.video_path, 
                    body.video_time, 
                    body.video_title, 
                    body.video_description,
                    video_extension
                ]);
                return res;
            });
            if (result.affectedRows > 0){                
                return { success: true, message: `Insert Video Metadata into DB Succeeded"`}
            } else {
                return { success: false, message: `Insert Video Metadata into DB failed"`}
            }          
            
        } catch (error) {
            console.error("Error in video-models.createVideo:", error.message);
        }
    },


    /*
    * 비디오 수정
    */
    updateVideo: async(params, body) => {
        const video_id = params.video_id;
        const video_title = body.video_title;
        const video_description = body.video_description;
        // console.log(video_id, video_title, video_description)
        try {
            const query = `CALL UP_FT_VIDEO_UPDATE(?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                const res = await conn.query(query, [
                    video_id,
                    video_title,
                    video_description
                ]);
                return res;
            });
            // console.log("Procedure result:", result);
            if (result[0].affectedRows > 0){                
                return { success: true, message: `Update Video Succeeded"`}
            } else {
                return { success: false, message: `Update Video failed"`}  
            } 
            
        } catch (error) {
            console.error("Error in video-models.updateVideo:", error.message);
        }
    }, 

//=========================== 댓글 =============================//    
    
    /*
    * 댓글 입력
    */
    createComment: async(params, body) => {        
        const dojang_id = params.dojang_id;        
        const comment_content = body.comment_content;
        const video_id = params.video_id || null;
        const photo_id = params.photo_id || null;
        const document_id = params.document_id || null;
        const parent_comment_id = body.parent_comment_id || null;
        try {
            const query = `CALL UP_FT_COMMENT_CREATE(?,?,?,?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                const res = await conn.query(query, [
                    dojang_id,
                    comment_content,
                    video_id,
                    photo_id,
                    document_id,
                    parent_comment_id
                ]);
                return res;
            });
            // console.log("Procedure result:", result);
            if (result[0].affectedRows > 0){                
                return { success: true, message: `Create Comment Succeeded"`}
            } else {
                return { success: false, message: `Create Comment failed"`}  
            } 
            
        } catch (error) {
            console.error("Error in video-models.createComment:", error.message);
        }
    },

    /*
   * 비디오 댓글 조회
   * params : { DOJANG_ID,VIDEO_ID }
   */ 
    readComment: async(params) => {
        // console.log(params, typeof params);
        const dojang_id = params.dojang_id;
        const video_id = params.video_id;
        
        try {
            const query = `CALL UP_FT_COMMENT_SELECT(?,?)`;
            const result = await connectionWrap(async (conn) => {
                const [[res]] = await conn.query(query, [dojang_id,video_id]);
                return res;
            });
            return result;
        } catch (error) {
            console.error("Error in video-models.readComment:", error.message);
        }
    },


    /*
   * 비디오 댓글 수 조회
   * params : { DOJANG_ID,VIDEO_ID }
   */ 
    readCommentCNT: async(params) => {
        // console.log(params, typeof params);
        const dojang_id = params.dojang_id;
        const video_id = params.video_id;
        
        try {
            const query = `CALL UP_FT_COMMENT_CNT_SELECT(?,?)`;
            const result = await connectionWrap(async (conn) => {
                const [[res]] = await conn.query(query, [dojang_id,video_id]);
                return res;
            });
            return result;
        } catch (error) {
            console.error("Error in video-models.readCommentCNT:", error.message);
        }
    },
    

    /*
    * 댓글 수정
    */
    updateComment: async(params,body) => {        
        const dojang_id = params.dojang_id;
        const video_id = params.video_id;   
        const comment_id = body.comment_id;   
        const comment_content = body.comment_content;  
        try {
            const query = `CALL UP_FT_COMMENT_UPDATE(?,?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                const res = await conn.query(query, [
                    dojang_id,
                    video_id,
                    comment_id,
                    comment_content
                ]);
                return res;
            });                
       
            if (result[0].affectedRows > 0){                
                return { success: true, message: `Update Comment Succeeded"`}
            } else {
                return { success: false, message: `Update Comment failed"`}}
        } catch (error) {
            console.error("Error in video-models.updateComment:", error.message);        
        }
    },
    
    /*
    * 댓글 삭제
    */
    deleteComment: async(params,body) => {        
        const dojang_id = params.dojang_id;
        const video_id = params.video_id;   
        const comment_id = body.comment_id;   
       try {
            const query = `CALL UP_FT_COMMENT_DELETE(?,?,?)`;
            const result = await connectionWrap(async (conn) => {
                const res = await conn.query(query, [
                    dojang_id,
                    video_id,
                    comment_id
                ]);
                return res;
            });                
            console.log(result);
            if (result[0].affectedRows > 0){                
                return { success: true, message: `Delete Comment Succeeded"`}
            } else {
                return { success: false, message: `Delete Comment failed"`}}
        } catch (error) {
            console.error("Error in video-models.deleteComment:", error.message);        
        }
    },
    
    
};