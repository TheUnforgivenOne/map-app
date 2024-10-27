<template>
  <div class="wrapper">
    <h1 class="title">{{ $t('about.mainTitle') }}</h1>
    <i18n-t keypath="about.description" tag="p">
      <b>{{ $t('about.techStack') }}</b>
      <b>{{ $t('header.aboutTitle') }}</b>
      <b>{{ $t('header.mapTitle') }}</b>
    </i18n-t>
    <h2 class="title">{{ $t('about.aboutTitle') }}</h2>
    <p>{{ $t('about.aboutDescription') }}</p>
    <h2 class="title">{{ $t('about.mapTitle') }}</h2>
    <div>
      <p>{{ $t('about.mapDescription.begin') }}</p>
      <ol>
        <li>
          {{ $t('about.mapDescription.list.first') }}
          <ol type="a">
            <i18n-t keypath="about.mapDescription.list.sublist.first" tag="li">
              <a href="https://geocode.maps.co/">https://geocode.maps.co/</a>
            </i18n-t>
            <li>
              {{ $t('about.mapDescription.list.sublist.second') }}
            </li>
          </ol>
        </li>
        <li>{{ $t('about.mapDescription.list.second') }}</li>
        <li>{{ $t('about.mapDescription.list.third') }}</li>
        <li>{{ $t('about.mapDescription.list.fouth') }}</li>
        <li>{{ $t('about.mapDescription.list.fifth') }}</li>
      </ol>
      <p>{{ $t('about.mapDescription.end') }}</p>
    </div>
    <h4 class="title">{{ $t('about.additional.title') }}</h4>
    <ol>
      <li>{{ $t('about.additional.list.first') }}</li>
      <li>{{ $t('about.additional.list.second') }}</li>
      <i18n-t keypath="about.additional.list.third" tag="li">
        <b>{{ $t('about.additional.list.jest') }}</b>
      </i18n-t>
    </ol>
    <i18n-t keypath="about.additional.mention" tag="p">
      <b>{{ $t('about.additional.mentionTitle') }}</b>
    </i18n-t>
    <br />
    <p>{{ $t('about.example') }}</p>
    <img src="../../public/example.png" />
  </div>
</template>

<style>
.wrapper {
  line-height: 2rem;
}

.title {
  margin: 2rem 0 1rem;
}

h1 {
  font-weight: normal;
}

h2 {
  font-weight: normal;
}

ol {
  margin-left: 3rem;
}

li {
  margin-bottom: 1rem;
}

img {
  width: 100%;
  padding: 0 64px;
}
</style>
