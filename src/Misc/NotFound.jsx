export const NotFound = async () => {

    const API_BASE = 'http://localhost:8080'
    const response = await fetch('${API_BASE}/api/users')
    return (
       <div>
           ${response.body}
       </div>
    );
}