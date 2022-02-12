# Market Watcher
Sends Cryptocurrency alerts.

# Project Setup
1. Download and install `Docker` and `Docker Compose` on your machine
2. Download and install [Make](http://gnuwin32.sourceforge.net/packages/make.htm)
3. Clone the repository and cd into the project folder
4. Create a file `.env` and copy the contents of `.env.default` into it. Update the placeholder values for the secrets as given [here](https://www.notion.so/SECRETS-72731d19b6134102ac9a024d4bade666)
5. Run `make migrations` to create migration files.
6. Run `make migrate` to execute migrations.
7. Run `make rebuild-and-start` to start the containers.



# Linting and formatting setup
In order to achieve consistent code formatting across IDEs, we will be using a tool called `pre-commit` to ensure all our code are formatted the same way upon commit.
1. Run `make precommit`. This will install the hooks specified in the  `.pre-commit-config.yaml` file.
