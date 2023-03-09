import { Command as Commander } from "commander";
import Command from "./Command";
import { ICommand } from "./types";

class Console {
	protected static commands: ICommand[] = [];

	protected static program: Commander = new Commander();

	public static bind(commandsList: ICommand[] | ICommand) {
		if (typeof commandsList === "function") Console.commands.push(commandsList);
		else Console.commands = [...Console.commands, ...commandsList];

		return Console;
	}

	public static parse() {
		Console.commands.forEach((CMD) => {
			const cmd = new CMD();

			const program = this.program
				.command(cmd.name)
				.description(cmd.description);

			Console.parseOptions(cmd, program);

			Console.parseArguments(cmd, program);

			program.action(cmd.action.bind(cmd));
		});

		Console.program.parse();
	}

	private static parseArguments(cmd: Command, program: Commander) {
		cmd.arguments.forEach((a) => {
			program.argument(a.title, a.description);
		});
	}

	private static parseOptions(cmd: Command, program: Commander) {
		cmd.options.forEach((o) => {
			program.option(o.title, o.description);
		});
	}

	public static resolve() {
		return Console.commands;
	}
}

export default Console;
