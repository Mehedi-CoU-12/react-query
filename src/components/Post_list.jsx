import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addPost, fetchPosts, fetchTags } from "../api/api";

function Post_list() {
    //fetch posts
    const {
        data: postData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });

    //fetch tags
    const {
        data: tagData,
        isLoading: isTagLoading,
        isError: isTagError,
        error: tagError,
    } = useQuery({
        queryKey: ["tags"],
        queryFn: fetchTags,
    });

    const queryClient = useQueryClient();

    //mutation to add post
    const {
        mutate,
        isError: isPostError,
        isPending,
        error: postError,
        reset,
    } = useMutation({
        mutationFn: addPost,
        // onMutate: () => {
        //     console.log("Adding post...");
        // },
        onSuccess: (data, variables, context) => {
            console.log("Post added successfully:", data);
            console.log("Variables:", variables);
            console.log("Context:", context);
            queryClient.invalidateQueries({
                queryKey: ["posts"],
            });
        },
    });

    const handleClick = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const title = formData.get("title");
        const tags = Array.from(formData.keys()).filter(
            (key) => formData.get(key) === "on"
        );

        if (!title || !tags) return;

        console.log("Form Data:", { title, tags });

        mutate({ id: postData.length + 1, title, tags });

        e.target.reset();
    };

    if (isLoading || isTagLoading) return <div>Loading....</div>;

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <div>
                {isTagLoading && <div>Loading...</div>}
                {isTagError && <div>{tagError?.message}</div>}
                <form onSubmit={handleClick}>
                    <input
                        type="text"
                        placeholder="enter your post..."
                        name="title"
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            marginBottom: "10px",
                            paddingLeft: "10px",
                            font: "menu",
                        }}
                    />
                    <div style={{ display: "flex" }}>
                        {tagData.map((tag) => (
                            <div key={tag}>
                                <input type="checkbox" id={tag} name={tag} />
                                <label htmlFor={tag}>{tag}</label>
                            </div>
                        ))}
                    </div>
                    <button
                        style={{
                            marginTop: "10px",
                            width: "100%",
                            height: "100%",
                            borderRadius: "10px",
                            textAlign: "center",
                            font: "menu",
                            cursor: "pointer",
                        }}
                    >
                        Create Post
                    </button>
                </form>
            </div>
            <h1>Post List</h1>
            <div>
                {isLoading && <div>Loading...</div>}
                {isError && <div>{error?.message}</div>}
                {postData && (
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        {postData.map((post, index) => {
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
                                        {index + 1}
                                        {"."}
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
        </div>
    );
}

export default Post_list;
