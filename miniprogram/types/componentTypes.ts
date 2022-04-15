interface GroupTaskDaily {
  headerText: String;
  contentList: Array<Content>;
  onSelect: () => void;
}
interface Content {
  id: String;
  content: String;
  select: Boolean;
}