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

        },

    }
});