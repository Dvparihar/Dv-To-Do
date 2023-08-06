export const GetAllTodoList = async () => {
    let result;
    try {
        const response = await fetch(process.env.REACT_APP_SERVER_PORT, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        });
        const res = await response?.json();
        result = {
            status: "success",
            data: res
        };
    } catch (error) {
        result = {
            status: 'error',
            message: error
        }
    }
    return result
}

export const CreateNewList = async (data) => {
    let result;
    try {
        const response = await fetch(process.env.REACT_APP_SERVER_PORT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const res = await response?.json();
        result = {
            status: "success",
            data: res
        };
    } catch (error) {
        result = {
            status: 'error',
            message: error
        }
    }
    return result
}

export const DeleteTodoList = async (id) => {
    let result;
    try {
        const response = await fetch(process.env.REACT_APP_SERVER_PORT + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" }
        });
        const res = await response?.json();
        result = {
            status: "success",
            data: res,
            message: "List Deleted Successfully"
        };
    } catch (error) {
        result = {
            status: 'error',
            message: error
        }
    }
    return result
}