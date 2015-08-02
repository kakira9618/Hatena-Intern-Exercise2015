package Log;
use strict;
use warnings;
use Time::Piece;

sub new {
	my ($class, %args) = @_;
	return bless \%args, $class;
}

# myself->{req} を解析した結果をハッシュで返す
sub getReqInfo {
	my $self = shift;
	my @reqList = split(/\s+/, $self->{req});
	
	return {
		method => $reqList[0],
		path => $reqList[1],
		protocol => $reqList[2],
	};

}

sub protocol {
	my $reqInfo = getReqInfo(shift); 
	return $reqInfo->{protocol};
}

sub method {
	my $reqInfo = getReqInfo(shift); 
	return $reqInfo->{method};
}

sub path {
	my $reqInfo = getReqInfo(shift); 
	return $reqInfo->{path};
}

sub uri {
	my $self = shift;
	return 'http://' . $self->{host} . $self->path();
}

sub time {
	my $self = shift;
	return gmtime($self->{epoch})->strftime("%Y-%m-%dT%H:%M:%S");
}

# 課題2用
sub to_hash {
	my $self = shift;

	my %hash = map {
		$self->{$_} ? ($_, $self->{$_}) : ();
	} ('status', 'size', 'user', 'referer');
	$hash{'method'} = $self->method();
	$hash{'uri'} = $self->uri();
	$hash{'time'} = $self->time();
	return \%hash;
}

1;
