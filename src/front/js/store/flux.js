const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			login: async(user) => {
                const resp = await fetch(process.env.BACKEND_URL + "/api/login", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(user)
				})
				const data = await resp.json()
				 if(resp.ok){
					setStore({ token: data.access_token})
					return true
				 }
				 else {
					return false
				}
			},
			createNewUser: async (userInfo) => {
				try {
					const res = await fetch(process.env.BACKEND_URL + '/api/register', {
						method: "POST",
						body: JSON.stringify(userInfo),
						headers: {
							"Content-Type": "application/json"
						}
					});
					if (res.status === 409) {
						console.error("El usuario ya existe");
						//return false; 
					}
					const data = await res.json();
					if (!res.ok){
						throw new Error(data.msg)
					}  
					return true; 
				} catch (error) {
					console.log(error.message)
					if (error.message == "Username already exists" || error.message == "Email already exists"){
						throw new Error(error.message); 
					}
					console.log(error.message)
					console.error("Error al crear un nuevo usuario:", error);
					return false; 
				}
			},

			logOut: () => {
				console.log('out')
				sessionStorage.clear()
				setStore({ userToken: "" })
				window.location.href = '/'
			},




		}
	};






};





export default getState;
