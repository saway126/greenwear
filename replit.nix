{ pkgs }: {
  deps = [
    pkgs.openjdk21
    pkgs.gradle
    pkgs.nodejs_20
    pkgs.yarn
    pkgs.git
    pkgs.which
  ];
}
