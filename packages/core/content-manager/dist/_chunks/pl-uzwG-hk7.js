"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const groups = "Grupy";
const models = "Typy Kolekcji";
const pageNotFound = "Strona nie znaleziona";
const pl = {
  "App.schemas.data-loaded": "Schematy zostały poprawnie załadowane",
  "ListViewTable.relation-loaded": "Relacje zostały załadowane",
  "ListViewTable.relation-loading": "Trwa ładowanie relacji",
  "ListViewTable.relation-more": "Ta relacja zwiera więcej wartości nież wyświetlana",
  "EditRelations.title": "Relacje",
  "HeaderLayout.button.label-add-entry": "Dodaj nowy wpis",
  "api.id": "API ID",
  "components.AddFilterCTA.add": "Filtry",
  "components.AddFilterCTA.hide": "Filtry",
  "components.DragHandle-label": "Przenieś",
  "components.DraggableAttr.edit": "Kliknij by edytować",
  "components.DraggableCard.delete.field": "Usuń {item}",
  "components.DraggableCard.edit.field": "Edytuj {item}",
  "components.DraggableCard.move.field": "Przenieś {item}",
  "components.ListViewTable.row-line": "rząd {number}",
  "components.DynamicZone.ComponentPicker-label": "Wybierz komponent",
  "components.DynamicZone.add-component": "Dodaj komponent do {componentName}",
  "components.DynamicZone.delete-label": "Usuń {name}",
  "components.DynamicZone.error-message": "Komponent zawiera błąd/błędy",
  "components.DynamicZone.missing-components": "Brakuje {number, plural, =0 {# komponentów} one {# komponentu} other {# komponentów}}",
  "components.DynamicZone.move-down-label": "Przesuń niżej",
  "components.DynamicZone.move-up-label": "Przesuń wyżej",
  "components.DynamicZone.pick-compo": "Wybierz jeden komponent",
  "components.DynamicZone.required": "Komponent jest wymagany",
  "components.EmptyAttributesBlock.button": "Przejdź do ustawień",
  "components.EmptyAttributesBlock.description": "Możesz zmienić ustawienia",
  "components.FieldItem.linkToComponentLayout": "Ustaw układ komponentu",
  "components.FieldSelect.label": "Dodaj pole",
  "components.FilterOptions.button.apply": "Zastosuj",
  "components.FiltersPickWrapper.PluginHeader.actions.apply": "Zastosuj",
  "components.FiltersPickWrapper.PluginHeader.actions.clearAll": "Wyczyść wszystko",
  "components.FiltersPickWrapper.PluginHeader.description": "Ustawianie warunków filtrowania elementów.",
  "components.FiltersPickWrapper.PluginHeader.title.filter": "Filtry",
  "components.FiltersPickWrapper.hide": "Ukryj",
  "components.LeftMenu.Search.label": "Szukaj",
  "components.LeftMenu.collection-types": "Typy kolekcji",
  "components.LeftMenu.single-types": "Pojedynczy typ",
  "components.LimitSelect.itemsPerPage": "Elementów na stronę",
  "components.NotAllowedInput.text": "Brak uprawnień do zobaczenia tego pola",
  "components.RepeatableComponent.error-message": "Komponent zawiera błąd/błędy",
  "components.Search.placeholder": "Szukaj elementu...",
  "components.Select.draft-info-title": "Stan: Szkic",
  "components.Select.publish-info-title": "Stan: Opublikowany",
  "components.SettingsViewWrapper.pluginHeader.description.edit-settings": "Dostosuj wygląd widoku edycji.",
  "components.SettingsViewWrapper.pluginHeader.description.list-settings": "Zdefiniuj ustawienia widoku listy.",
  "components.SettingsViewWrapper.pluginHeader.title": "Skonfiguruj widok - {name}",
  "components.TableDelete.delete": "Usuń",
  "components.TableDelete.deleteSelected": "Usuń zaznaczone",
  "components.TableDelete.label": "{number, plural, one {# wpis zaznaczony} other {# wpisy zaznaczone}}",
  "components.TableEmpty.withFilters": "Nie istnieją elementy {contentType} zgodne z zastosowanymi filtrami...",
  "components.TableEmpty.withSearch": "Nie istnieją elementy {contentType} zgodne z wyszukiwaną frazą ({search})...",
  "components.TableEmpty.withoutFilter": "Nie istnieją jeszcze elementy związane z {contentType}... Stwórz pierwszy jak najszybciej!",
  "components.empty-repeatable": "Jeszcze nie ma wpisu. Kliknij przycisk poniżej, aby go dodać.",
  "components.notification.info.maximum-requirement": "Osiągięto maksymalną liczbę pól",
  "components.notification.info.minimum-requirement": "Dodano pole spełniające minimalne wymagania",
  "components.repeatable.reorder.error": "Wystąpił błąd podczas zmiany pozycji komponentu, spróbuj raz jeszcze",
  "components.reset-entry": "Zresetuj wpis",
  "components.uid.apply": "zastostuj",
  "components.uid.available": "Dostępny",
  "components.uid.regenerate": "Odnów",
  "components.uid.suggested": "zasugerowany",
  "components.uid.unavailable": "Niedostępny",
  "containers.Edit.Link.Layout": "Skonfiguruj układ",
  "containers.Edit.Link.Model": "Edytuj typ kolekcji",
  "containers.Edit.addAnItem": "Dodaj element...",
  "containers.Edit.clickToJump": "Kliknij aby przejść do elementu",
  "containers.Edit.delete": "Usuń",
  "containers.Edit.delete-entry": "Usuń ten wpis",
  "containers.Edit.editing": "Edytowanie...",
  "containers.Edit.information": "Informacje",
  "containers.Edit.information.by": "Przez",
  "containers.Edit.information.created": "Stworzony",
  "containers.Edit.information.draftVersion": "wersja szkicu",
  "containers.Edit.information.editing": "Edytowanie",
  "containers.Edit.information.lastUpdate": "Ostatnia aktualizacja",
  "containers.Edit.information.publishedVersion": "wersja publikacji",
  "containers.Edit.pluginHeader.title.new": "Nowy wpis",
  "containers.Edit.reset": "Wyczyść",
  "containers.Edit.returnList": "Wróć do listy",
  "containers.Edit.seeDetails": "Szczegóły",
  "containers.Edit.submit": "Prześlij",
  "containers.EditSettingsView.modal-form.edit-field": "Edytuj pole",
  "containers.EditView.add.new-entry": "Dodaj wpis",
  "containers.EditView.notification.errors": "Formularz zawiera błędy",
  "containers.Home.introduction": "Aby edytować wpisy przejdź do odpowiedniego linku w menu po lewej. Ten plugin nie ma odpowiedniego sposobu na edytowanie ustawień i nadal jest w trakcie rozwijania.",
  "containers.Home.pluginHeaderDescription": "Zarządzaj swoimi danymi za pomocą potężnego i pięknego interfejsu.",
  "containers.Home.pluginHeaderTitle": "Treści",
  "containers.List.draft": "Szkic",
  "containers.List.errorFetchRecords": "Błąd",
  "containers.List.published": "Opublikowany",
  "containers.list.displayedFields": "Wyświetlone atrybuty",
  "containers.list.items": "{number, plural, =0 {items} one {item} other {items}}",
  "containers.list.table-headers.publishedAt": "Stan",
  "containers.ListSettingsView.modal-form.edit-label": "Edytuj etykietę",
  "containers.SettingPage.add.field": "Wstaw inne pole",
  "containers.SettingPage.attributes": "Pola atrybutów",
  "containers.SettingPage.attributes.description": "Zdefiniuj kolejność atrybutów",
  "containers.SettingPage.editSettings.description": "Przeciągnij i upuś pola by zbudować układ",
  "containers.SettingPage.editSettings.entry.title": "Tytuł wpisu",
  "containers.SettingPage.editSettings.entry.title.description": "Ustaw wyświetlane pole swojego wpisu",
  "containers.SettingPage.editSettings.relation-field.description": "Ustaw wyświetlane pole w obydwu widokach listy",
  "containers.SettingPage.editSettings.title": "Edycja (ustawienia)",
  "containers.SettingPage.layout": "Układ",
  "containers.SettingPage.listSettings.description": "Skonfiguruj opcje dla tego modelu",
  "containers.SettingPage.listSettings.title": "Lista (ustawienia)",
  "containers.SettingPage.pluginHeaderDescription": "Skonfiguruj konkretne ustawienia tego modelu",
  "containers.SettingPage.settings": "Ustawienia",
  "containers.SettingPage.view": "Widok",
  "containers.SettingViewModel.pluginHeader.title": "Menedżer treści  - {name}",
  "containers.SettingsPage.Block.contentType.description": "Skonfiguruj konkretne ustawienia",
  "containers.SettingsPage.Block.contentType.title": "Typy Kolekcji",
  "containers.SettingsPage.Block.generalSettings.description": "Skonfiguruj domyślne opcje dla twoich typów kolekcji",
  "containers.SettingsPage.Block.generalSettings.title": "Ogólne",
  "containers.SettingsPage.pluginHeaderDescription": "Skonfiguruj domyślne opcje wszystkich twoich modeli",
  "containers.SettingsView.list.subtitle": "Skonfiguruj układ i wyświetlanie modeli i grup",
  "containers.SettingsView.list.title": "Wyświetl ustawienia",
  "edit-settings-view.link-to-ctb.components": "Edytuj komponent",
  "edit-settings-view.link-to-ctb.content-types": "Edytuj",
  "emptyAttributes.button": "Przejdź do konstruktora modeli",
  "emptyAttributes.description": "Dodaj swoje pierwszy atrybut do modelu",
  "emptyAttributes.title": "Nie ma jeszcze żadnych atrybutów",
  "error.attribute.key.taken": "Ta wartość już istnieje",
  "error.attribute.sameKeyAndName": "Nie mogą być takie same",
  "error.attribute.taken": "Atrybut o tej nazwie już istnieje",
  "error.contentTypeName.taken": "Ta nazwa już istnieje",
  "error.model.fetch": "Wystąpił błąd podczas pobierania konfiguracji modelów.",
  "error.record.create": "Wystąpił błąd podczas tworzenia rekordu.",
  "error.record.delete": "Wystąpił błąd podczas usuwania rekordu.",
  "error.record.fetch": "Wystąpił błąd podczas pobierania rekordu.",
  "error.record.update": "Wystąpił błąd podczas zmiany rekordu.",
  "error.records.count": "Wystąpił błąd podczas liczenia rekordów.",
  "error.records.fetch": "Wystąpił błąd podczas pobierania rekordów.",
  "error.schema.generation": "Wystąpił błąd podczas generowania schematu.",
  "error.validation.json": "To nie jest JSON",
  "error.validation.max": "Wartość jest za wysoka.",
  "error.validation.maxLength": "Wartość jest za długa.",
  "error.validation.min": "Wartość jest za niska.",
  "error.validation.minLength": "Wartość jest za krótka.",
  "error.validation.minSupMax": "Nie może być większa",
  "error.validation.regex": "Wartość nie jest zgodna z wymaganym wzorcem.",
  "error.validation.required": "Wpisanie wartości dla tego atrybutu jest wymagane.",
  "form.Input.bulkActions": "Włącz akcje masowe",
  "form.Input.defaultSort": "Domyślny atrybut sortowania",
  "form.Input.description": "Opis",
  "form.Input.description.placeholder": "Nazwa wyświetlana",
  "form.Input.editable": "Edytowalne pole",
  "form.Input.filters": "Włącz filtry",
  "form.Input.label": "Etykieta",
  "form.Input.label.inputDescription": "Ta wartość nadpisuje etykietę wyświetlaną w nagłówku tabeli",
  "form.Input.pageEntries": "Wpisy na stronę",
  "form.Input.pageEntries.inputDescription": "Uwaga: Możesz zmienić tę wartość na stronie ustawień modeli.",
  "form.Input.placeholder": "Placeholder",
  "form.Input.placeholder.placeholder": "Moja wartość",
  "form.Input.search": "Włącz wyszukiwanie",
  "form.Input.search.field": "Włącz wyszukiwanie po tym polu",
  "form.Input.sort.field": "Włącz sortowanie po tym polu",
  "form.Input.sort.order": "Domyślne sortowanie",
  "form.Input.wysiwyg": "Wyświetl jako edytor WYSIWYG",
  "global.displayedFields": "Wyświetlane pola",
  groups,
  "groups.numbered": "Grupy ({number})",
  "header.name": "Zawartość",
  "link-to-ctb": "Edytuj model",
  models,
  "models.numbered": "Modele ({number})",
  "notification.error.displayedFields": "Co najmniej jedno pole musi być wyświetlane",
  "notification.error.relationship.fetch": "Wystąpił błąd podczas pobierania relacji.",
  "notification.info.SettingPage.disableSort": "Co najmniej jeden atrybut musi mieć włączoną możliwość sortowania",
  "notification.info.minimumFields": "Musisz wyświetlić przynajmniej jedno pole",
  "notification.upload.error": "Wystąpił bład podczas przesyłania plików",
  pageNotFound,
  "pages.ListView.header-subtitle": "{number, plural, =0 {#} one {# } other {# }} znaleziono",
  "pages.NoContentType.button": "Stwórz pierszy Content-Type",
  "pages.NoContentType.text": "Nie masz jeszcze żadnej zawartości. Polecamy stworzyć pierwszy Content-Type.",
  "permissions.not-allowed.create": "Brak uprawnień do stworzenia dokumentu",
  "permissions.not-allowed.update": "Brak uprawnień do odczytu dokumentu",
  "plugin.description.long": "Szybki sposób na przeglądanie, zmianę i usuwanie elementów z twojej bazy danych.",
  "plugin.description.short": "Szybki sposób na przeglądanie, zmianę i usuwanie elementów z twojej bazy danych.",
  "popover.display-relations.label": "Wyświetl powiązania",
  "success.record.delete": "Usunięto",
  "success.record.publish": "Opublikowano",
  "success.record.save": "Zapisano",
  "success.record.unpublish": "Cofnięto publikację",
  "utils.data-loaded": "Udało się załadować wpis/wpisy.",
  "apiError.This attribute must be unique": "{field} musi być unikalne",
  "popUpWarning.warning.publish-question": "Czy nadal chcesz to opublikować?",
  "popUpwarning.warning.has-draft-relations.button-confirm": "Tak, opublikuj"
};
exports.default = pl;
exports.groups = groups;
exports.models = models;
exports.pageNotFound = pageNotFound;
//# sourceMappingURL=pl-uzwG-hk7.js.map