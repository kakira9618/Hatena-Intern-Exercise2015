package Parser;
use strict;
use warnings;
use Log;

sub new {
    my ($class, %args) = @_;
    return bless \%args, $class;
}

# LTSVデータを読み、データの1行を1つの要素とするリストへのリファレンスを返す。
sub loadLTSVdata {
	my $self = shift;
	open my $fh, '<', $self->{filename} or dir $!;
	my @data = <$fh>;
	return \@data;
}

# 1行分の文字列を受け取って、blessされたオブジェクトを作成
sub parseLine {
	my @record = split(/\t/, shift);
	my %result = (); 
	foreach(@record) {
		chomp $_;
		my ($key) = split(/:/, $_);
		my $value = substr($_, length($key) + 1);
		if ($value eq '-') {next;}
		$result{$key} = $value;
	}
	return bless \%result, 'Log';
}

sub parse {
	my $self = shift;
	my $data_ref = $self->loadLTSVdata();
	my @ret = map {parseLine($_)} @$data_ref;
	return \@ret;
}

1;
