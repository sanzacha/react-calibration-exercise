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
            $('.git-user-info').show();

            if (response.length) {
                $.each(response, function(index, repo) {
                    $('#git-user-info').append(`
                        <div class="deatils">
                            <div class="avatar-img col-md-1">
                                <img src="${repo.owner.avatar_url}" />
                            </div>
                            <div class="repo-name col-md-9" data-reponame="${repo.name}">
                                <strong>Repository Name :</strong> ${repo.name} <br/>
                                <strong>Date Created :</strong> ${repo.created_at} <br/>
                                <strong>Repo Page :</strong> <a href="${repo.git_url}">${repo.name}</a>
                            </div>
                            <button href="#" class="btn btn-success btn-new-issues">Create Issues</button>
                        </div>
                        <form class="new-issues-form" id="issuesGitUser">
                            <div class="col-md-5">
                                <div class="col-md-12 issue-items-input">
                                    <label>Title: </label>
                                    <input type="newissues" id="inputNewIssues" class="form-control new-issues-input" placeholder="Enter Issues" />
                                </div>
                                <div class="col-md-12 issue-items-input">
                                    <label>Comments: </label>
                                    <textarea class="form-control" placeholder="Leave a comment" id="issueComments"></textarea>
                                </div>
                                <div class="col-md-12">
                                    <button href="#" class="btn btn-success submit-issue" data-toggle="modal" data-target="#exampleModal">Submit</button>
                                </div> 
                            </div>
                        </form>
                    `);
                });
            } else {
                $('#git-user-info').append(`
                    <div class="error">User not exist...</div>
                    <button href="#" class="btn btn-success back-to-search">Back to Search</button>
                `);
            }

            $('.btn-new-issues').bind('click', function() {
                $('.new-issues-form').hide();
                $('.deatils').removeClass('active');
                $(this).parents('.deatils').next('.new-issues-form').css('display', 'flex');
                $(this).parents('.deatils').addClass('active');
            });

            $(".submit-issue").bind('click', function(e) {
                e.preventDefault();
        
                var getTitle = $('#inputNewIssues').val(),
                    getComments = $('#issueComments').val(),
                    getRepoName = $('.repo-name').data('reponame'),
                    repoUrl = 'https://api.github.com/repos/' + username + '/' + getRepoName + '/issues';

                $.ajax ({
                    type: 'POST',
                    url: repoUrl,
                    beforeSend: function(xhr) {
                        xhr.setRequestHeader("Authorization", "token 7a018f36794afce23e137f0aac0e24ef82d58efd");
                    },
                    data: JSON.stringify({
                        title: getTitle,
                        body: getComments
                    })
                }).done(function(data) {
                    $('#exampleModal').on('shown.bs.modal', function () {});
                    $('#exampleModal').on('hidden.bs.modal', function () {
                        $('#inputNewIssues').val('');
                        $('#issueComments').val('');
                    });
                }).fail(function() {
                    console.log('fail');
                });
            });

            $('.back-to-search').bind('click', function(e) {
                $('.git-user-info').hide();
                $('#getGitUser').show();
            });

        }).fail(function() {
            $('#git-user-info').append(`
                <div class="error">User not exist...</div>
                <button href="#" class="btn btn-success back-to-search">Back to Search</button>
            `);

            $('.git-user-info').show();

            $('.back-to-search').bind('click', function(e) {
                $('.git-user-info').hide();
                $('#getGitUser').show();
            });
        });
    });
});