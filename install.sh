
#! /usr/bin/env bash

if ! type node > /dev/null; then
    unameStr=$(uname)
    if [[ "$unameStr" == 'Darwin' ]]; then
        if ! type nvm > /dev/null; then
            echo $'\e[0;31m\nNote: this will add a couple lines to ~/.bashrc, so you may want to move those in the future.\n\e[0m'
            curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.27.1/install.sh | bash
            source ~/.bashrc
        fi

        nvm install stable
        nvm alias default stable

        npm install -g git+https://github.com/vicjohnson1213/Kelp.git

    elif [[ "$unameStr" == 'windowsnt' ]]; then
        echo $"\e[0;31mPlease install node.js and re-run the build command\e[0m"
    fi
else
    echo "Installing dependencies and running the unit tests"
    npm install -g git+https://github.com/vicjohnson1213/Kelp.git
fi