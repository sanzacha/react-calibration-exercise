$(document).ready(function() {
    $("#getGitUser").submit(function(e) {
        e.preventDefault();
        $('#getGitUser').hide();
        var username = $('#inputUserName').val();

        $.ajax({
            url:'https://api.github.com/users/' + username + '/repos',
            data:{
                client_id:'b951ca18b9237be1b31b',
                client_secret:'14dbed36660a4fe2c87771f7a15a94e94ca7d970'
            }
        }).done(function (response) {
            // console.log(response);

            $('.git-user-info h1').show();

            $.each(response, function(index, repo) {
                $('#git-user-info').append(`
                    <div class="deatils">
                        <div class="repo-name" data-reponame="${repo.name}">${repo.name}</div>
                        <a class="btn btn-outline-primary btn-new-issues" href="#">New Issues</a>
                    </div>
                    <form class="new-issues-form" id="issuesGitUser">
                        <input type="newissues" id="inputNewIssues" class="form-control new-issues-input" placeholder="Enter Issues" />
                        <a class="btn btn-outline-primary submit-issue" href="#">Submit</a>
                    </form>
                `);
            });

            $('.btn-new-issues').bind('click', function() {
                $('.new-issues-form').hide();
                $(this).parents('.deatils').next('.new-issues-form').css('display', 'flex');
            });

            $(".submit-issue").bind('click', function(e) {
                e.preventDefault();
        
                var getIssues = $('#inputNewIssues').val(),
                    getRepoName = $('.repo-name').data('reponame'),
                    repoUrl = 'https://api.github.com/repos/' + username + '/' + getRepoName + '/issues';

                $.ajax ({
                    type: 'POST',
                    url: repoUrl,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "token b5b6abb88a99cf990a7825883c417602e464aa96");
                    },
                    data: JSON.stringify({
                        title: getIssues
                    })
                }).done(function(data){
                     console.log('pass');
                }).fail(function(){
                    console.log('fail');
                });
            });
        });
    });
});