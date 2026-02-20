export default function ProtectedRoute({ children }) {

    const isAuthenticated = sessionStorage.getItem("userId");

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}