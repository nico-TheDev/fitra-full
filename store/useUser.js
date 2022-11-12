import create from "zustand";

const useUser = create((set) => ({
    user: {
        name: "Jimmy McGill",
        email: "jimmymcgill@gmail.com",
        image: "",
        id: "1",
        token: "",
    },
}));

export default useUser;
