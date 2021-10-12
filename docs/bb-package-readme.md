# BigBang Package README Template

## Updating README.md for BigBang package

Each BigBang package should be using this standardized README template in gluon, with more information inside a docs/ foler with an overview.md file.

To update/generate this README.md for a package using the template perform the following:

```bash
curl -O https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/raw/master/docs/README.md.gotmpl
curl -O https://repo1.dso.mil/platform-one/big-bang/apps/library-charts/gluon/-/raw/master/docs/.helmdocsignore
docker run --rm -v "$(pwd):/helm-docs" -u $(id -u) jnorwood/helm-docs:v1.5.0 -s file -t /helm-docs/README.md.gotmpl --dry-run > README.md
```

This will output into the existing (or populate) README.md that is in the root of the package repo. Push up this new README.md up with your package changes.

## Notes
[Helm-docs](https://github.com/norwoodj/helm-docs) uses a `.helmdocsignore` file to ignore dependencies or other linked charts, otherwise by default all found Chart.yaml's will be outputted into the generated README.

[helmdocsignore information](https://github.com/norwoodj/helm-docs#ignoring-chart-directories)
