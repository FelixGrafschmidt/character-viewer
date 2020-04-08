import { Character } from "@/models/Character";
import axios, { AxiosResponse } from "axios";

export function saveCharacters(characters: Array<Character>, id?: string): Promise<AxiosResponse<string>> {
	if (id !== undefined) {
		return axios.post("http://localhost:8081/saveList/" + id, characters);
	} else {
		return axios.post("http://localhost:8081/saveList", characters);
	}
}
export function loadCharacters(id: string): Promise<AxiosResponse<Array<Character>>> {
	return axios.get("http://localhost:8081/getList/" + id);
}
