export LSCOLORS=gxbxxxxxfxxxxxxxxxcxcx
export LS_COLORS='di=36:ln=31:so=0:pi=0:ex=35:bd=0:cd=0:su=0:sg=0:tw=32:ow=32'

alias la="ls -a --color=always -C"
alias rm='rm -i'
alias cp='cp -i'
alias mv='mv -i'
alias al='alias'
alias rl='exec $SHELL -l'
alias path='echo $PATH'
alias pg='sudo purge'
alias q='exit'
alias ..='cd ..'
c () {
    cd ./$1 && ls -a --color=always -C
}
mc () {
    mkdir -p ./$1 && cd $_
}
alias rd='rm .DS_Store' 
export PS1="[\h@\u] \[\e[32m\]\w\[\e[m\]\n\\$ \[\e[36m\]＞\[\e[m\]  "