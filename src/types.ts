import Command from "./Command";

export interface IOptions {
	title: string;
	description: string;
}

export interface IArguments {
	title: string;
	description: string;
}

type Constructable<T> = new (...args: any[]) => T;

export type ICommand = Constructable<Command>;

export type IQuestionTypes =
	| "checkbox"
	| "confirm"
	| "editor"
	| "expand"
	| "input"
	| "list"
	| "number"
	| "password"
	| "rawlist";

export interface IPromptOptions {
	type: IQuestionTypes;
	choices?: any[];
	key?: string;
}