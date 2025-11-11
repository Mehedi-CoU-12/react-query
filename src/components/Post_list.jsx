import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchPosts } from "../api/api";

function Post_list() {
    const {
        data: postData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    console.log("---data", postData, isLoading, isError, error);

    return (
        <>
            {isLoading && <div>Loading...</div>}
            {isError && <div>{error?.message}</div>}
            {postData && (
                <div>
                    {postData.map((post) => {
                        return (
                            <div
                                style={{
                                    marginBottom: "20px",
                                    padding: "10px",
                                    border: "1px solid black",
                                }}
                                key={post.id}
                            >
                                <span
                                    style={{
                                        textAlign: "center",
                                        fontSize: "30px",
                                        fontWeight: "semi-bold",
                                        marginRight: "10px",
                                    }}
                                >
                                    {post.title}
                                </span>

                                {post.tags.map((tag) => (
                                    <span
                                        style={{
                                            textAlign: "center",
                                            background: "grey",
                                            color: "white",
                                            padding: "2px 5px",
                                            borderRadius: "5px",
                                            marginRight: "10px",
                                        }}
                                        key={tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
}

export default Post_list;
