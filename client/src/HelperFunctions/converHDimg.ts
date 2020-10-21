/* If you at the URL carefully, you will see URL are similar
 till _V1_ after it for big image it uses [SY1000_CR0,0,675,1000_AL_] so
  you need to replace this in your small i
mage URL to get the big image URL */

export default function (imgLink: string) {
  // TODO: convert url to hd url
  const findString = "_V1_UX182_CR0,0,182,268_AL_";
  const newString = "_V1_SY1000_CR0,0,675,1000_AL_";
  const HDlink = imgLink.replace(findString, newString);
  return HDlink;
}
