import { useMutation, useQuery } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";

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

    const {
        data: tagData,
        isLoading: isTagLoading,
        isError: isTagError,
        error: tagError,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    const {
        mutate,
        isError: isPostError,
        isPending,
        error: postError,
        reset,
    } = useMutation({
        queryFn: addPost,
    });

    const handleClick = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get("title");
        const tags = Array.from(formData.keys()).filter(
            (key) => formData.get(key) === "on"
        );

        if (!title || !tags) return;

        mutate({ id: postData.length + 1, title, tags });

        e.target.reset();
    };

    if (isLoading || isTagLoading) return <div>Loading....</div>;

    return (
        <>
            <div>
                {isTagLoading && <div>Loading...</div>}
                {isTagError && <div>{tagError?.message}</div>}
                <form onSubmit={handleClick}>
                    <input
                        type="text"
                        placeholder="enter your post..."
                        name="title"
                    />
                    <div>
                        {tagData.map((tag) => (
                            <div key={tag}>
                                <input type="checkbox" id={tag} name={tag} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        ))}
                    </div>
                    <button style={{ marginTop: "10px" }}>Create Post</button>
                </form>
            </div>
            <h1>Post List</h1>
            <div>
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
            </div>
        </>
    );
}

export default Post_list;
