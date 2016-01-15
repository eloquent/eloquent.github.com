<github-repository-list>
    <ul>
        <li class="repository" each={repositories}>
            <strong><a href="{homepage ? homepage : html_url}">{name}</a></strong> - {description}
        </li>
    </ul>

    <script>
        opts.repositories.sort(
            function (left, right) {
                if (left.stargazers_count < right.stargazers_count) {
                    return 1;
                }

                if (left.stargazers_count > right.stargazers_count) {
                    return -1;
                }

                return 0;
            }
        );

        this.repositories = opts.repositories;
    </script>
</github-repository-list>
