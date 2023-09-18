import { useMutation, useQuery } from "react-query";
import { message } from 'antd';
import {userService} from "../../services/UserService.js";
const useClients = (queryClient, id, close, reset) => {

    const add = useMutation(data => userService.add(data), {
        onSuccess: (data) => {
            message.success("Successfully added!");
            queryClient.invalidateQueries("users");
            reset();
            close();
        },
        onError: (error) => {
            console.log(error?.response?.data);
            message.error("There has been an error!");
        }
    });

    const edit = useMutation(data => userService.edit(data), {
        onSuccess: (data) => {
            message.success("Successfully edited!");
            queryClient.invalidateQueries("users");
            close();
        },
        onError: (error, variables, context) => {
            console.log(error?.response?.data);
            message.error("There has been an error!");
        }
    });

    const deleteClient = useMutation(
        (data) => userService.delete(data),
        {
            onSuccess: () => {
                message.success("Successfully deleted!");
                queryClient.invalidateQueries("users");
                close();
            },
            onError: (err) => {
                console.log(err?.response?.data);
                message.error("There has been an error!");
            }
        }
    );




    return { add, edit, deleteClient};
}

export default useClients;
