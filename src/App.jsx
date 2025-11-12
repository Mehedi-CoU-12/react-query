import Post_list from "./components/Post_list";

function App() {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
            }}
        >
            <h1>React Query Tutorial</h1>
            <Post_list />
        </div>
    );
}

export default App;
