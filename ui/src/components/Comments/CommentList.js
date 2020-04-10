import React from "react";
import Comment from "./Comment";

export default function CommentList(props) {
    console.log('commentList', props.comments)
    return (
        <div >
            {(props.comments != '' && props.comments != 'undefined' && props.comments  != null)?
            
            <h5 >
                <span className="badge badge-success">{props.comments.length}</span>{" "}
                Comments
            </h5>
            :'No comments'}
            {/* {props.comments.length === 0 && !props.loading ? (
                <div className="alert text-center alert-info">
                Be the first to comment
                </div>
            ) : null}

            {props.comments.map((comment, index) => (
                // <Comment key={index} comment={comment} />
                <div>
                    hello
                </div>
            ))} */}
        
        </div>
  );
}
