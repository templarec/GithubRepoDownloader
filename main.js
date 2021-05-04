var app = new Vue({
    el: '#root',
       data: {
        utente: '',
        gitPath: 'git',
        esito: false,
        allRepos: null,
        nameRepos: [],
        currentRepo: null,
        totalRepos: 0,
        downloadedRepo: 0
    },
    computed: {},
    methods: {
        //ricevo repo tramite mia api
        getRepo:function () {
            this.allRepos = null
            this.totalRepos = 0
            this.downloadedRepo = 0
            this.nameRepos = []
            if (this.utente !== ''){ //importante! se lascio user scarica tutte le repo di github!!!!
                /*this.esito = 'Scaricando...'*/
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
            // mi prendo dal json di github il nome della repo e il suo url di clone
            //e le pusho in un array
            this.allRepos.items.forEach((item)=>{
                const objRepo = {
                    name: item.name,
                    clone_url: item.clone_url
                }
                this.nameRepos.push(objRepo)
            })
            //genero una chiamata api per ogni repo
            this.nameRepos.forEach((repo)=>{

                const $apiDownload = `download.php?gitpath=${this.gitPath}&user=${this.utente}&repo=${repo.name}&repourl=${repo.clone_url}`

                axios.get($apiDownload)
                    .then((risposta)=>{
                        this.downloadedRepo++
                        this.currentRepo = repo.name
                        console.log(risposta)//il famoso console log di shell_exec() di download.php
                    })
            })

        },

    }
});