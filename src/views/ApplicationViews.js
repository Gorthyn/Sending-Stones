import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/games/GameList"
import { GameForm } from "../components/games/GameForm"
import { GameDetails } from "../components/games/GameDetails"
import { DiceRoller } from "../components/dice/DiceRoller"
import { TopicDetails } from "../components/topics/TopicDetails"
import { PostDetails } from "../components/posts/PostDetails"
import { PostForm } from "../components/posts/PostForm"
import { TopicForm } from "../components/topics/TopicForm"
import { CommentForm } from "../components/comments/CommentForm"
import { GameEditForm } from "../components/games/GameEditForm"
import { TopicEditForm } from "../components/topics/TopicEditForm"
import { PostEditForm } from "../components/posts/PostEditForm"
import { CommentEditForm } from "../components/comments/CommentEditForm"

export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route exact path="/" element={<GameList />} />
            <Route path="/game/new" element={<GameForm />} />
            <Route path="/game/:gameId/edit" element={<GameEditForm />} />
            <Route path="/game/:gameId" element={<GameDetails />} />
            <Route path="/diceroller" element={<DiceRoller />} />
            <Route path="/game/:gameId/topic/:topicId" element={<TopicDetails />} />
            <Route path="/game/:gameId/topic/new" element={<TopicForm />} />
            <Route path="/topic/:topicId/edit" element={<TopicEditForm />} />
            <Route path="/post/:postId/comment/new" element={<CommentForm />} />
            <Route path="/comment/:commentId/edit" element={<CommentEditForm />} />
            <Route path="/post/:postId" element={<PostDetails />} />
            <Route path="/post/:postId/edit" element={<PostEditForm />} />
            <Route path="/topic/:topicId/post/new" element={<PostForm />} />
            <Route element={<Authorized />}>
                {/* Add Routes here */}
            </Route>
        </Routes>
    </>
}
