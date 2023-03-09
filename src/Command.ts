import inquirer from "inquirer";
import { IArguments, IOptions, IPromptOptions } from "./types";

abstract class Command {
	options: IOptions[] = [];

	arguments: IArguments[] = [];

	constructor(public name: string = "", public description: string = "") {}

	public abstract action(argument: string, options?: object): void;

	/**
	 *
	 * asks a question from console and returnes the answer.
	 * @param question: string
	 * @returns
	 */
	async ask(question: string): Promise<string> {
		return await this.prompt(question);
	}

	async password(question: string): Promise<string> {
		return await this.prompt(question, {
			type: "password",
		});
	}

	async checkbox(question: string): Promise<string> {
		return await this.prompt(question, {
			type: "checkbox",
			choices: ["option 1", "option 2"],
		});
	}

	async list(question: string): Promise<string> {
		return await this.prompt(question, {
			type: "rawlist",
			choices: ["option 1", "option 2"],
		});
	}

	async confirm(question: string): Promise<string> {
		return await this.prompt(question, {
			type: "confirm",
		});
	}

	private async prompt(question: string, options?: IPromptOptions) {
		const answer = await inquirer.prompt({
			name: "question",
			message: question,
			type: options?.type,
			choices: options?.choices,
		});

		return answer.question;
	}

	call(command: string) {
		//
	}
}

export default Command;
