import {
    Adapt,
    Button,
    Dialog,
    H2,
    ListItem,
    Paragraph,
    ScrollView,
    Separator,
    Sheet,
    Unspaced,
    YGroup,
    YStack,
} from "tamagui"
import nameAllahData from "../../../assets/data/99_name.json"
import { useState } from "react"
import { XSquare } from "@tamagui/lucide-icons"
import useLanguageStore from "../../../store/languagesStore"
import {i18n} from "../../../lib/i18n";

const App = () => {
    const [open, setOpen] = useState(false)

    const { language } = useLanguageStore();
    i18n.locale = language;

    return (
        <ScrollView>
            <YStack paddingVertical="$4" paddingHorizontal="$4">
                <H2 marginBottom="$8">
                    {i18n.t('nameAllah.title')}
                </H2>
                <YGroup
                    alignSelf="center"
                    width="100%"
                    size="$5"
                    marginBottom="$8"
                    separator={<Separator />}
                >
                    {nameAllahData.data.map((item, i) => (
                        <Dialog
                            key={i}
                            modal
                            onOpenChange={(open) => {
                                setOpen(open)
                            }}
                        >
                            <Dialog.Trigger asChild>
                                <ListItem
                                    hoverTheme
                                    pressTheme
                                    backgroundColor="#4c6c53"
                                    borderColor="white"
                                    title={`${item.number} - ${item.transliteration}`}
                                    subTitle={language === "en" ? ` ${item.en.meaning} - ${item.name} ` : ` ${item.fr.meaning} - ${item.name} `}
                                />
                            </Dialog.Trigger>

                            <Adapt when="sm" platform="touch">
                                {/* @ts-ignore */}
                                <Sheet animation="medium" zIndex={200000} modal dismissOnSnapToBottom>
                                    <Sheet.Frame padding="$4" gap="$4">
                                        <Adapt.Contents />
                                    </Sheet.Frame>
                                    <Sheet.Overlay
                                        animation="lazy"
                                        enterStyle={{ opacity: 0 }}
                                        exitStyle={{ opacity: 0 }}
                                    />
                                </Sheet>
                            </Adapt>

                            <Dialog.Portal>
                                <Dialog.Overlay
                                    key="overlay"
                                    animation="quick"
                                    opacity={0.5}
                                    enterStyle={{ opacity: 0 }}
                                    exitStyle={{ opacity: 0 }}
                                />

                                <Dialog.Content
                                    bordered
                                    elevate
                                    key="content"
                                    animateOnly={['transform', 'opacity']}
                                    animation={[
                                        'quick',
                                        {
                                            opacity: {
                                                overshootClamping: true,
                                            },
                                        },
                                    ]}
                                    enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
                                    exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
                                    gap="$4"
                                >
                                    <Dialog.Title>
                                        {language === 'en' ? `${item.en.meaning} ${item.name}` : `${item.fr.meaning} ${item.name}`}
                                    </Dialog.Title>
                                    <Dialog.Description>
                                        <Paragraph>
                                            {
                                                language === 'en' ? item.en.desc : decodeURIComponent(JSON.parse(`"${item.fr.desc}"`))
                                            }
                                        </Paragraph>


                                    </Dialog.Description>




                                    <Unspaced>
                                        <Dialog.Close asChild>
                                            <Button
                                                position="absolute"
                                                top="$3"
                                                right="$3"
                                                size="$2"
                                                circular
                                                icon={XSquare}
                                            />
                                        </Dialog.Close>
                                    </Unspaced>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </Dialog>
                    ))}
                </YGroup>
            </YStack>
        </ScrollView>
    )
}



export default App
