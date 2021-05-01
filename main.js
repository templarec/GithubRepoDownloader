var app = new Vue({
    el: '#root',
    mounted () {
        if (this.gitPath.indexOf('Program Files') > 0) {
            this.gitPath = this.gitPath.split('Program Files').join('%PROGRAMFILES%');
        }
        console.log(this.gitPath)
    },

    data: {
        utente: '',
        gitPath: '/opt/homebrew/bin/git',
        esito: false,
        allRepos: null,
        nameRepos: [],
        currentRepo: null,
        totalRepos: 0,
        downloadedRepo: 0
    },
    computed: {},
    methods: {
        getRepo:function () {
            if (this.utente !== ''){
                this.esito = 'Scaricando...'
                 axios.get('getRepos.php?user=' + this.utente)
                    .then( (risposta) => {

                        this.allRepos = risposta
                        this.totalRepos = risposta.total_count
                        this.downloadRepo();
                    })

            } else {
                alert("Nessun utente inserito!")
            }

        },
        downloadRepo: function () {
            this.downloadRepo = 0
            this.allRepos.items.forEach((item)=>{
                const objRepo = {
                    name: item.name,
                    clone_url: item.clone_url
                }
                this.nameRepos.push(objRepo)
            })
            this.nameRepos.forEach((repo)=>{

                const $apiDownload = `download.php?gitpath=${this.gitPath}&user=${this.utente}&repo=${repo.name}&repourl=${repo.clone_url}`

                axios.get($apiDownload)
                    .then((risposta)=>{
                        this.downloadedRepo++
                        this.currentRepo = repo.name
                        console.log(risposta)
                    })
            })

        }

    }
});